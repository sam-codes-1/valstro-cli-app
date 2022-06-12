export type EventNames = {
  [key: string]: string
}

export type SearchResponseType = {
  page: number
  resultCount: number
  error?: string
  name?: string
  films?: string
}
