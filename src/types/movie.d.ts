export interface IMovieItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IMovieAPIRes {
  Search: IMovieItem[]
  totalResults: number
  Response: string
  Error: string
}
