import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
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
    setIsLoading(true);
    fetch(
      `https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    )
      .then(() => {
        setIsLoading(false);
        setIngredients((prevState) =>
          prevState.filter(({ id }) => ingredientId !== id)
        );
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong!');
      });
  };

  const filterIngredientsHandler = useCallback(
    (ingredients) => setIngredients(ingredients),
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
