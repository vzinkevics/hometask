import { Injectable } from '@nestjs/common';
import { EmployedUser } from './types/employed-people.dto';
import { promises as fs } from 'fs';

@Injectable()
export class AppService {
  /** Final solution - 5M users and 1M companies processing takes 8.7 sec */
  async getEmployedUsers(): Promise<EmployedUser[]> {
    const people = await this.getPeople();
    const companies = await this.getCompanies();

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    });

    const sortedCompaniesMap = companies
      .sort((a, b) => {
        return collator.compare(a, b);
      })
      .reduce((acc, company, order) => {
        acc[company.id] = {
          name: company.name,
          order: order,
        };
        return acc;
      }, {});

    const result = people.reduce((data, person) => {
      if (person.employedAtId === null) {
        return data;
      }

      const order = sortedCompaniesMap[person.employedAtId].order;
      const employedPerson = {
        name: person.name,
        employedAt: sortedCompaniesMap[person.employedAtId].name,
      };

      if (data[order]) {
        data[order] = [...data[order], employedPerson];
      } else {
        data[order] = [employedPerson];
      }
      return data;
    }, []);

    return result.flat();
  }

  /** Solution 1 - ineffective solution. Takes ~24 sec to process 5M users + 1M companies */
  // async getEmployedUsersx(): Promise<EmployedUser[]> {
  //   const people = await this.getPeople();
  //   const companiesMap = await this.getCompaniesMap();
  //
  //   const collator = new Intl.Collator(undefined, {
  //     numeric: true,
  //     sensitivity: 'base',
  //   });
  //
  //   return people
  //     .filter((person) => person.employedAtId !== null)
  //     .map((person) => ({
  //       name: person.name,
  //       employedAt: companiesMap[person.employedAtId],
  //     }))
  //     .sort((a, b) => {
  //       return collator.compare(a.employedAt, b.employedAt);
  //     });
  // }

  /** Solution 2 - transformed Solution 1 (made it in async way) - processing ~24 sec
   * Actually, here is no reason to make it async as there are no api or database calls
   * So practically - this works same amount of time as sync version
   * */
  // async getEmployedUsersAsync(): Promise<EmployedUser[]> {
  //   const people = await this.getPeople();
  //   const companiesMap = await this.getCompaniesMap();
  //
  //   const promiseList = [];
  //   const BATCH_SIZE = 100000;
  //
  //   for (let i = 0; i < people.length; i += BATCH_SIZE) {
  //     const batch = people.slice(i, i + BATCH_SIZE);
  //     console.log(batch.length);
  //     promiseList.push(this.processBatch(companiesMap, batch));
  //   }
  //   const results = await Promise.all(promiseList);
  //
  //   const collator = new Intl.Collator(undefined, {
  //     numeric: true,
  //     sensitivity: 'base',
  //   });
  //
  //   return results.flat().sort((a, b) => {
  //     return collator.compare(a.employedAt, b.employedAt);
  //   });
  // }
  //
  // async processBatch(companiesMap, batch) {
  //   const result = batch
  //     .filter((person) => person.employedAtId !== null)
  //     .map((person) => ({
  //       name: person.name,
  //       employedAt: companiesMap[person.employedAtId],
  //     }));
  //   return result;
  // }

  async getCompanies() {
    const companiesData = await fs.readFile('companies.json', 'utf8');
    return JSON.parse(companiesData);
  }

  async getCompaniesMap() {
    const companies = await this.getCompanies();
    return companies.reduce((acc, company) => {
      acc[company.id] = company.name;
      return acc;
    }, {});
  }

  async getPeople() {
    const peopleData = await fs.readFile('people.json', 'utf8');
    return JSON.parse(peopleData);
  }
}
