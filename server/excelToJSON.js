const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('./data/nutrition.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const nutritionData = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync('./data/nutritionDB.json', JSON.stringify(nutritionData, null, 2));
console.log('✅ Converted Excel to JSON!');
