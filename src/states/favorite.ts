import { atom } from 'hooks/state'
import { IMovieItem } from 'types/movie'

export const favoriteListState = atom<IMovieItem[]>({
  key: '#favoriteListState',
  default: [],
})
