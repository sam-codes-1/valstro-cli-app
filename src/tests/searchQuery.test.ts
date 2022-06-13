import {isSearchQueryValid} from '../utils/searchQuery'

describe('Validate isSearchQueryValid function.', () => {
  it('Should reject undefined values for search input', () => {
    const searchResponse = isSearchQueryValid('')
    expect(searchResponse).toBeFalsy()
  })
  it('Should reject values less than 2 characters', () => {
    const searchResponse = isSearchQueryValid('i')
    expect(searchResponse).toBeFalsy()
  })
  it('Should accept values greater than or equal to 2', () => {
    const searchResponse = isSearchQueryValid('ie')
    expect(searchResponse).toBeTruthy()
  })
})
