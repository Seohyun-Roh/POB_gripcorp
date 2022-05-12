import { ChangeEvent, FormEvent, RefObject } from 'react'

import { useState, useRef, useEffect } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieListState } from 'states/movie'
import { getMovieListApi } from 'services/movie'

import styles from './Search.module.scss'
import Header from 'routes/_shared/Header'
import TabBar from 'routes/_shared/TabBar'
import Item from './Item'

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

  const loadMore = () => {
    setCurrPage((prev) => prev + 1)
  }

  const pageEnd = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1 }
    )
    observer.observe(pageEnd.current as Element)
  }, [isLoading])

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
            // <li key={movie.imdbID}>{movie.Title}</li>
            <Item key={movie.imdbID} movie={movie} />
          ))}
        </ul>
        <button type='button' ref={pageEnd}>
          +
        </button>
      </main>
      <TabBar />
    </div>
  )
}

export default Search
