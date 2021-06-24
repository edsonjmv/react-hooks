import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput === inputRef.current.value) {
        const query = userInput
          ? `?orderBy="title"&equalTo="${userInput}"`
          : '';
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
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [userInput, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={({ target }) => setUserInput(target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
