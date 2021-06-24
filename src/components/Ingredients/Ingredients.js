import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setIngredients((prevState) => [
      ...prevState,
      {
        ...ingredient,
        id: Math.random().toString()
      }
    ]);
  };

  const removeIngredientHandler = (ingredientId) => {
    setIngredients((prevState) =>
      prevState.filter(({ id }) => ingredientId !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)}
        />
      </section>
    </div>
  );
};

export default Ingredients;
