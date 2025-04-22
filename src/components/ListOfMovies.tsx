import {IMovie} from "../types/movie.ts";

interface IMovieProps {
  movies: IMovie[]
}

export function ListOfMovies({ movies }: IMovieProps) {
  return (
    <ul className="movies">
      {movies.map(movie => (
        <li className="movie" key={movie.id}>
          <img src={movie.image} alt={movie.title}/>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  )
}

export function NoMovies() {
  return (
    <p> No result </p>
  )
}

export function Movies({ movies }: IMovieProps) {
  const hasMovies = movies.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />
}