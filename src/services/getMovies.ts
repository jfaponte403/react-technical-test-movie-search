import {mappedMovies} from "../utils/mappedMovies.ts";

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export async function getMoviesApi(search: string): Promise<any> {
  if (search === '') return null
  try {
    const response = await fetch(`${API_URL}/?apikey=${API_KEY}&s=${search}`)
    const data = await response.json()
    return mappedMovies(data.Search)

  } catch (e) {
    throw new Error(`Error fetching movies: ${e}`)
  }
}