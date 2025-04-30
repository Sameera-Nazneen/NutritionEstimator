const mockRecipes = {
    biryani: `
       Basmati Rice: 150g
      Chicken: 200g
       Yogurt: 50g
       Onion: 100g
       Tomato: 50g
       Ginger-Garlic Paste: 20g
       Oil: 30g
       Garam Masala: 5g
       Turmeric: 2g
       Red Chili Powder: 3g
    `,
  
    dosa: `
       Rice: 100g
       Urad Dal: 50g
       Fenugreek Seeds: 2g
       Salt: 2g
       Oil: 10g
    `,
  
    poha: `
       Rice Puffed (Poha): 100g
       Onion: 50g
       Mustard Seeds: 2g
       Green Chili: 5g
       Curry Leaves: 2g
       Turmeric Powder: 2g
       Oil: 10g
       Salt: 2g
       Lemon Juice: 10g
    `,
  
    rajma: `
      - Kidney Beans (Rajma): 100g
      - Onion: 75g
      - Tomato: 100g
      - Ginger-Garlic Paste: 20g
      - Oil: 20g
      - Cumin Seeds: 2g
      - Coriander Powder: 5g
      - Red Chili Powder: 3g
      - Garam Masala: 5g
      - Salt: 3g
    `,
  
    upma: `
      - Rava (Semolina): 100g
      - Onion: 50g
      - Mustard Seeds: 2g
      - Green Chili: 5g
      - Curry Leaves: 2g
      - Water: 250ml
      - Ghee: 10g
      - Salt: 2g
    `,
  
    chole: `
      - Chickpeas: 100g
      - Onion: 100g
      - Tomato: 100g
      - Ginger-Garlic Paste: 20g
      - Oil: 25g
      - Chole Masala: 10g
      - Salt: 3g
    `,
  };
  
  
  async function getRecipe(dishName) {
    const recipeText = mockRecipes[dishName.toLowerCase()];  
    
    if (!recipeText) {
        return `No mock recipe found for ${dishName}.`;
    }

    
    const ingredients = recipeText.split('\n').map(ingredient => ingredient.trim()).filter(Boolean);

    
    const parsedIngredients = ingredients.map(ingredient => {
        const parts = ingredient.split(':');
        if (parts.length !== 2) {
            console.error('Invalid ingredient format:', ingredient);
            return null;
        }

        const name = parts[0].trim();
        const quantity = parts[1].trim();
        return { name, quantity };
    }).filter(Boolean);  

    return parsedIngredients;
  }

  module.exports = getRecipe ;
  

