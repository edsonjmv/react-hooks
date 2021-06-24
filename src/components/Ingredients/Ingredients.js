import React, { useState, useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(({ id }) => id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
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
        setIsLoading(false);
        dispatch({
          type: 'ADD',
          ingredient: {
            ...ingredient,
            id: responseData.name
          }
        });
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    )
      .then(() => {
        setIsLoading(false);
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong!');
      });
  };

  const filterIngredientsHandler = useCallback(
    (ingredients) => dispatch({ type: 'SET', ingredients }),
    []
  );

  return (
    <div className="App">
      {error && <ErrorModal onClose={() => setError(null)}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

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
