import React from 'react';

function Result({ result }) {

  const { protein, carbs, fat} = result;

  return (
    <div>
      
      <h4>Nutrition per Serving (200ml):</h4>
      <ul>
        
        <li>Protein: {protein}</li>
        <li>Carbs: {carbs}</li>
        <li>Fat: {fat}</li>
      </ul>
    </div>
  );
}

export default Result;

