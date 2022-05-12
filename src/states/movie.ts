import { atom } from 'hooks/state'
import { IMovieItem } from 'types/movie'

export const movieListState = atom<IMovieItem[]>({
  key: '#movieListState',
  default: [
    {
      Title: '',
      Year: '',
      imdbID: '',
      Type: '',
      Poster: '',
    },
  ],
})
