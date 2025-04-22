import './App.css'

import {Movies} from "./components/ListOfMovies.tsx";
import {useMovies} from "./hook/useMovies.ts";
import * as React from "react";
import {useSearch} from "./hook/useSearch.ts";

export function App() {
  const {movies} = useMovies()
  const {search, error, setSearch } = useSearch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(search)
  }

  return (
    <div className="main-container">
      <header>
        <h1>Movie Search</h1>
        <form onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} type="text" placeholder="marvel"/>
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}
