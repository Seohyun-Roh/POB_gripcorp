import { ChangeEvent, FormEvent } from 'react'

import { useState } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieListState } from 'states/movie'
import { getMovieListApi } from 'services/movie'

import styles from './Search.module.scss'
import Header from 'routes/_shared/Header'
import TabBar from 'routes/_shared/TabBar'

const Search = () => {
  const [searchInputval, setSearchInputVal] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [movieList, setMovieList] = useRecoil(movieListState)
  const [errMessage, setErrMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.currentTarget.value)
    setCurrPage(1)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)

    try {
      const { data } = await getMovieListApi({
        s: searchInputval,
        page: currPage,
      })

      if (data.Response === 'True') {
        setMovieList(data.Search)
      } else {
        setErrMessage(data.Error)
      }
    } catch (err) {
      setErrMessage('잘못된 접근입니다.')
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <div className={styles.search}>
      <Header />
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='search'
          value={searchInputval}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type='submit' disabled={isSubmitted}>
          검색하기
        </button>
      </form>
      <main className={styles.searchMain}>
        <ul className={styles.itemList}>
          {movieList.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      </main>
      <TabBar />
    </div>
  )
}

export default Search
