import React from 'react'

import { useState } from 'react'

import axios from 'axios'

function NutritionForm({setResult}) {

    const [dish, setDish] = useState('');

    const [ingredients, setIngredients] = useState('');
 const [loading, setLoading] = useState(false);



    const handleGetIngredients = async (e) => {

        e.preventDefault();

        try {

          setLoading(true);

          const response = await axios.post('http://localhost:3001/api/get-nutrition', { dish });
            setResult(response.data);
          setIngredients(response.data.ingredients); 

          setLoading(false);

        } catch (error) {

          console.error('Error fetching ingredients:', error);

          setLoading(false);

        }

      };



      

    const handleEstimateNutrition = async () => {

        try {

          setLoading(true);

          const response = await axios.post('http://localhost:3001/nutrition', { dish, ingredients });

          setResult(response.data);

          setLoading(false);

        } catch (error) {

          console.error('Error estimating nutrition:', error);

          setLoading(false);

        }

      };





  return (

    <div>

      <form onSubmit = {handleGetIngredients}>

        <input type = "text" value ={dish} 

        onChange = {(e) => setDish(e.target.value)} 

        style = {{width: '300px', height: '30px'}}

        placeholder = "Enter dish name"

        required />

        <button type = "submit" disabled = {loading}>{loading? 'Loading...' : 'Estimate'}

        </button>

    </form>

    {ingredients && (

        <div style={{ marginTop: '20px' }}>

          <h4>Ingredients:</h4>

          <pre>{ingredients}</pre>

          <button onClick={handleEstimateNutrition} disabled={loading}>

            {loading ? 'Estimating...' : 'Estimate Nutrition'}

          </button>

        </div>

      )}

    </div>

  )

}



export default NutritionForm

