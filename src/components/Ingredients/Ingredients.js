import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    fetch(
      'https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setIngredients((prevState) => [
          ...prevState,
          {
            ...ingredient,
            id: responseData.name
          }
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      setIngredients((prevState) =>
        prevState.filter(({ id }) => ingredientId !== id)
      );
    });
  };

  const filterIngredientsHandler = useCallback(
    (ingredients) => setIngredients(ingredients),
    []
  );

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)}
        />
      </section>
    </div>
  );
};

export default Ingredients;
