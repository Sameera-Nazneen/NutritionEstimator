 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const  {readNutritionData}  = require('./utils/readNutritionDB');
const getRecipe = require('./utils/getRecipe');
const { getNutritionData } = require('./utils/readNutritionDB');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/nutrition', async (req, res) => {
    try {
        const data = await readNutritionData();
        res.json(data);
      } catch (error) {
        console.log('Error reading nutrition data:', error);
        res.status(500).json({ error: error });
      }
    });


app.post('/api/get-recipe', async (req, res) => {
      const { dish } = req.body;
    
      try {
        const recipeText = await getRecipe(dish);
        res.json({ ingredients: recipeText });
      } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'Failed to fetch recipe ' });
      }
});


app.post('/api/get-nutrition', async (req, res) => { 
  const { dish } = req.body;

  try {
    const recipe = await getRecipe(dish); 

    if (!Array.isArray(recipe)) {
      return res.status(400).json({ error: 'Invalid recipe format, expected an array of ingredients.' });
    }

    const parsedIngredients = recipe.map(ingredient => {
      const { name, quantity } = ingredient;
      const quantityInGrams = parseFloat(quantity.replace(/[^0-9.]/g, ''));
      const unit = quantity.replace(/[0-9.]/g, '').trim() || 'gram';

      return { name, quantityInGrams, unit };
    });

    let totalNutrition = {
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    for (const ingredient of parsedIngredients) {
      const { name, quantityInGrams, unit } = ingredient;
      const ingredientData = getNutritionData(name);

      if (ingredientData) {
        totalNutrition.protein += (parseFloat(ingredientData.protein_g) * quantityInGrams) / 100 || 0;
        totalNutrition.carbs += (parseFloat(ingredientData.carbs_g) * quantityInGrams) / 100 || 0;
        totalNutrition.fat += (parseFloat(ingredientData.fat_g) * quantityInGrams) / 100 || 0;
      } else {
        console.warn('No nutrition data found for:', name);
      }
    }

    res.json({
      protein: totalNutrition.protein.toFixed(2),
      carbs: totalNutrition.carbs.toFixed(2),
      fat: totalNutrition.fat.toFixed(2),
    });
  } catch (error) {
    console.error('Error calculating nutrition:', error);
    res.status(500).json({ error: 'Failed to calculate nutrition' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
