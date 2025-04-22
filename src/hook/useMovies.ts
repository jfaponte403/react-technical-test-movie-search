import {IMovie} from "../types/movie.ts";
import {useState} from "react";
import {getMoviesApi} from "../services/getMovies.ts";


export function useMovies() {
  const [responseMovies, setResponseMovies] = useState<IMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getMovies = (search) => {
    setLoading(true)
    setError(null)
    getMoviesApi(search)
      .then(response => {
        setResponseMovies(response)
      })
      .catch(error => {
        setError(`error: ${error.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {responseMovies, getMovies, movieError: error, loading}
}