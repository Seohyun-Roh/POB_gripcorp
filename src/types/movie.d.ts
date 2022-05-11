export interface IMovieItem {
  title: string
  year: string
  imdbID: string
  type: string
  poster: string
}

export interface IMovieAPIRes {
  search: IMovieItem[]
  totalResults: number
  response: string
}
