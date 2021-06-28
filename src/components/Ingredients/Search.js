import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput === inputRef.current.value) {
        const query = userInput
          ? `?orderBy="title"&equalTo="${userInput}"`
          : '';
        sendRequest(
          `https://react-hooks-889a0-default-rtdb.firebaseio.com/ingredients.json${query}`,
          'GET'
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [userInput, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          ...data[key],
          id: key
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [isLoading, error, data, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
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
