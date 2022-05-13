import { ChangeEvent, FormEvent } from 'react'

import { useState, useRef, useEffect } from 'hooks'
import { useRecoil } from 'hooks/state'
import { movieListState } from 'states/movie'
import { getMovieListApi } from 'services/movie'

import styles from './Search.module.scss'
import Header from 'routes/_shared/Header'
import TabBar from 'routes/_shared/TabBar'
import Item from './Item'

const Search = () => {
  const [movieList, setMovieList, resetMovieList] = useRecoil(movieListState)
  const [searchInputVal, setSearchInputVal] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [currPage, setCurrPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalResults, setTotalResults] = useState<number>(0)

  const pageEnd = useRef(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value)
  }

  const loadMore = () => {
    setCurrPage((prev) => prev + 1)
  }

  const loadMovies = async (page: number) => {
    try {
      const { data } = await getMovieListApi({
        s: searchInputVal,
        page,
      })

      if (page === 1) {
        setTotalResults(data.totalResults)
      }

      if (data.Response === 'True') {
        setMovieList((prev) => [...prev, ...data.Search])
      }
    } finally {
      setIsSubmitted(false)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    loadMovies(currPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    resetMovieList()
    setIsSubmitted(true)
    setCurrPage(1)
    loadMovies(1)
  }

  useEffect(() => {
    let observer: IntersectionObserver

    if (pageEnd.current) {
      observer = new IntersectionObserver(
        async (entries) => {
          const target = entries[0]

          if (target.isIntersecting) {
            if (currPage * 10 < totalResults) {
              loadMore()
            }
          }
        },
        { threshold: 1.0 }
      )

      observer.observe(pageEnd.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalResults])

  return (
    <div className={styles.search}>
      <Header />
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='search'
          value={searchInputVal}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type='submit' disabled={isSubmitted}>
          검색하기
        </button>
      </form>
      <main className={styles.searchMain}>
        {movieList.length ? (
          <ul className={styles.itemList}>
            {movieList.map((movie, idx) => {
              const key = `movie-${idx}`
              return <Item key={key} movie={movie} />
            })}
            <li className={styles.observeLi} ref={pageEnd}>
              {isLoading && 'Loading... 😊'}
            </li>
          </ul>
        ) : (
          <div>에러 메시지</div>
        )}
      </main>
      <TabBar />
    </div>
  )
}

export default Search
