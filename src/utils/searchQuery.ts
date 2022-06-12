export const APPLICATION_NAME = 'valstro-search'

export const isSearchQueryValid = (searchQuery: string | undefined): boolean => {
  const regex = new RegExp(/^[a-zA-Z0-9]*$/i)
  if (!searchQuery) {
    return false
  } else if (searchQuery.length < 2) {
    return false
  } else {
    return regex.test(searchQuery)
  }
}
