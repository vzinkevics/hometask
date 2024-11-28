const fs = require('fs');
function generateData(numItems) {
  const companies = [];

  for (let i = 1; i <= numItems; i++) {
    companies.push({
      id: i,
      name: `Company_${i}`,
    });
  }

  return companies;
}

const data = generateData(1000000);
const jsonData = JSON.stringify(data);

// Write the JSON data to a file
fs.writeFile('companies.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('JSON file has been created successfully!');
  }
});
