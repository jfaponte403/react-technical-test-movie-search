import './App.css'

import {Movies} from "./components/ListOfMovies.tsx";
import {useMovies} from "./hook/useMovies.ts";

export function App() {
  const {movies} = useMovies()

  return (
    <div className="main-container">

      <header>
        <h1>Movie Search</h1>

        <form>
          <input type="text" placeholder="marvel"/>
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies}/>
      </main>


    </div>
  )
}

