import React, { useState } from 'react';
import NutritionForm from './components/NutritionForm';
import Result from './components/Result';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      <h2>Indian Dish Nutrition Estimator</h2>
      <NutritionForm setResult={setResult} />
      {result && <Result result={result} />}
    </div>
  );
}

export default App;

