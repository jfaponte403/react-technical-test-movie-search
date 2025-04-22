import {useEffect, useState} from "react";

export function useSearch() {
  const [search, setSearch] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    if (search === '') {
      setError('Please enter a search term')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('Please enter a valid search term')
      return
    }

    if (search.length < 3) {
      setError('Please enter a valid search term with at least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, error, setSearch }
}