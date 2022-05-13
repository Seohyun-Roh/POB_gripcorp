import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com/'

interface Params {
  s: string
  page: number
}

export const getMovieListApi = (params: Params) =>
  axios.get<IMovieAPIRes>(MOVIE_BASE_URL, {
    params: {
      ...params,
      apikey: process.env.REACT_APP_GRIP_API_KEY,
    },
  })
