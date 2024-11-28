const fs = require('fs');

function getRandomNumber() {
  // Generate a random number between 1 and 10,000,000
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  // Randomly decide whether to return null
  const shouldReturnNull = Math.random() < 0.1; // 10% chance to return null
  return shouldReturnNull ? null : randomNumber;
}

function generateData(numItems) {
  const companies = [];

  for (let i = 1; i <= numItems; i++) {
    companies.push({
      id: i,
      name: `Person_${i}`,
      employedAtId: getRandomNumber(),
    });
  }

  return companies;
}

const data = generateData(5000000);
const jsonData = JSON.stringify(data);

// Write the JSON data to a file
fs.writeFile('people.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('JSON file has been created successfully!');
  }
});
