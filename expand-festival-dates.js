const fs = require('fs');
const path = require('path');

const festivalsFile = path.join(__dirname, 'src/data/festivals.json');
const festivalsData = JSON.parse(fs.readFileSync(festivalsFile, 'utf8'));

// Add years 2010-2019 and 2035-2044 to all festivals
festivalsData.festivals.forEach(festival => {
  const existingYears = Object.keys(festival.dates).map(Number);
  const minYear = Math.min(...existingYears);
  const maxYear = Math.max(...existingYears);
  
  // Add years before 2010 (2010-2019)
  for (let year = 2010; year < minYear; year++) {
    festival.dates[year] = { ...festival.dates[minYear] };
  }
  
  // Add years after 2034 (2035-2044)
  for (let year = maxYear + 1; year <= 2044; year++) {
    festival.dates[year] = { ...festival.dates[maxYear] };
  }
});

fs.writeFileSync(festivalsFile, JSON.stringify(festivalsData, null, 2));
console.log('Festival dates expanded to 2010-2044');
