import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const [formState, setFormState] = useState({
    title: '',
    amount: ''
  });

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient(formState);
  };

  const inputChangeHandler = ({ target }, controlName) => {
    setFormState((prevState) => ({
      ...prevState,
      [controlName]: target.value
    }));
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={formState.title}
              onChange={(event) => inputChangeHandler(event, 'title')}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={formState.amount}
              onChange={(event) => inputChangeHandler(event, 'amount')}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
