import './App.css';

import { Movies } from './components/ListOfMovies.tsx';
import { useMovies } from './hook/useMovies.ts';
import { useSearch } from './hook/useSearch.ts';
import * as React from 'react';
import { useMemo, useState } from 'react';
import debounce from 'just-debounce-it';

export function App() {
  const [sort, setSort] = useState<boolean>(false);
  const { responseMovies, getMovies, movieError, loading } = useMovies({
    sort,
  });
  const { search, error, setSearch } = useSearch();

  const debouncedGetMovies = useMemo(() => {
    return debounce((search: string) => {
      getMovies(search);
    }, 300);
  }, [getMovies]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMovies(search);
  };

  const handleSort = () => {
    setSort(!sort);
  };
  return (
    <div className="main-container">
      <header>
        <h1>Movie Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            type="text"
            placeholder="marvel"
          />
          <input type="checkbox" checked={sort} onChange={handleSort} />

          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : movieError ? (
          <p>Try again</p>
        ) : (
          <Movies movies={responseMovies} />
        )}
      </main>
    </div>
  );
}
