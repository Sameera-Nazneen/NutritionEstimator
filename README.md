# 🍲 Nutrition Estimator - VYB Full Stack Assessment

This Node.js-based project estimates the nutritional values of Indian dishes by using a local nutrition database (Excel file) and mock ingredient data.

---

## 📌 Project Overview

- ✅ Accepts a dish name via POST API.
- 📋 Uses mock ingredient data (from local file).
- 📗 Reads nutrition values from an Excel sheet.
- ⚖️ Calculates estimated nutritional values based on ingredient quantities.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- XLSX (for reading Excel)
- Body-parser, CORS
- Local JSON and Excel-based storage

---


---

## 🚀 How to Run

1. Clone the repo :

```bash
git clone https://github.com/yourusername/nutrition-estimator
cd NutritionEstimator

## Sample Input
{
  "dish": "idli"
}

## Sample Response
{
    "Protein (g)": 8,
    "Fat (g)": 2,
    "Carbohydrates (g)": 55
}

##Nutrition is calculated by matching ingredients with their values from nutrition.xlsx.

## Notes
-All data is stored locally — no third-party API used.

-Dish recipes are mocked in getRecipe.js.

-The nutrition data is extracted from data/nutrition.xlsx.

