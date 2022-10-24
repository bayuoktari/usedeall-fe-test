import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useQuery = () => {
  const { search } = useLocation()
  const queryString = useMemo(() => new URLSearchParams(search), [search])
  return Object.fromEntries(queryString)
}

export default useQuery
