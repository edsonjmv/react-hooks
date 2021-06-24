import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    console.log(userInput);
    const query = userInput ? `?orderBy="title"&equalTo="${userInput}"` : '';

    fetch(
      `https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients.json${query}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            ...responseData[key],
            id: key
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [userInput, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={userInput}
            onChange={({ target }) => setUserInput(target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
