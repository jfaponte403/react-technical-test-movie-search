import {IMovie} from "../types/movie.ts";
import {useRef, useState} from "react";
import {getMoviesApi} from "../services/getMovies.ts";


export function useMovies() {
  const [responseMovies, setResponseMovies] = useState<IMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const previousSearch = useRef('')

  const getMovies = (search: string) => {
    if (search === previousSearch.current) return

    setLoading(true)
    setError(null)
    getMoviesApi(search)
      .then(response => {
        if (!response) return
        setResponseMovies(response)
        previousSearch.current = search
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