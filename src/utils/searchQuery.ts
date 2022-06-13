export const APPLICATION_NAME = 'valstro-search'

export const isSearchQueryValid = (searchQuery: string | undefined): boolean => {
  if (!searchQuery || searchQuery.length < 2) {
    return false
  }
  return true
}
