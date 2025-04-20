import {IMovie, IMovieApi} from "../types/movie.ts";
import responseMovies from "../mocks/results.json";

const mappedMovies = (moviesFromApi: IMovieApi[]): IMovie[] => (
  moviesFromApi.map((movie): IMovie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
    type: movie.Type
  }))
)

export function useMovies() {
  const movies = mappedMovies(responseMovies.Search)

  return { movies }
}