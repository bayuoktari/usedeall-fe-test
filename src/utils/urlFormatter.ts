const generateQueryString = (query: Record<string, unknown>) => {
  if (typeof query === "object") {
    const queryString = Object.entries(query)
      .filter(([, val]) => {
        if (val === null || val === undefined || val === "") {
          return false
        }
        return true
      })
      .map(([key, val]) => `${key}=${val}`)
      .join("&")

    return `${queryString}`
  }
  return ""
}
export default generateQueryString
