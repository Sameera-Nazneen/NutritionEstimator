const XLSX = require('xlsx');
const path = require('path');

let cachedNutritionData = null;

function readNutritionData() {
  if (cachedNutritionData) {
    return cachedNutritionData;
  }
  const filePath = path.resolve(__dirname, '../data/nutrition.xlsx');
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    cachedNutritionData = XLSX.utils.sheet_to_json(sheet);
    return cachedNutritionData;
  } catch (error) {
    console.error('Error reading nutrition data:', error);
    throw error;
  }
}

function getNutritionData(name) {
  const nutritionData = readNutritionData();
  if (!nutritionData) {
    return null;
  }

  const matchingIngredients = nutritionData.filter(item =>
    item && item.food_name && item.food_name.toLowerCase().includes(name.toLowerCase())
  );

  if (matchingIngredients.length > 0) {
    // If there are multiple matches, you might need a more specific logic
    // For now, let's just return the data of the first match.
    return matchingIngredients[0];
  }

  return null; 
}

module.exports = { readNutritionData, getNutritionData };