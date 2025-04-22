import { IMovie } from '../types/movie.ts';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getMoviesApi } from '../services/getMovies.ts';

export function useMovies({ sort }: { sort: boolean }) {
  const [responseMovies, setResponseMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const previousSearch = useRef('');

  const getMovies = useCallback((search: string) => {
    if (search === previousSearch.current) return;
    setLoading(true);
    setError(null);
    getMoviesApi(search)
      .then((response) => {
        if (!response) return;
        setResponseMovies(response);
        previousSearch.current = search;
      })
      .catch((error) => {
        setError(`error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...responseMovies].sort((a, b) => a.title.localeCompare(b.title))
      : responseMovies;
  }, [sort, responseMovies]);

  return {
    responseMovies: sortedMovies,
    getMovies,
    movieError: error,
    loading,
  };
}
