import {IMovie, IMovieApi} from "../types/movie.ts";

export const mappedMovies = (moviesFromApi: IMovieApi[]): IMovie[] => (
  moviesFromApi.map((movie): IMovie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
    type: movie.Type
  }))
)
