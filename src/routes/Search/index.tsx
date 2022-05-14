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
  const [currPage, setCurrPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [isErr, setIsErr] = useState<boolean>(false)

  const pageEnd = useRef(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value)
  }

  const loadMovies = async (page: number) => {
    try {
      const { data } = await getMovieListApi({
        s: searchInputVal,
        page,
      })

      if (page === 1) {
        setTotalResults(Number(data.totalResults))
      }

      if (data.Response === 'True') {
        setMovieList((prev) => [...prev, ...data.Search])
        setIsErr(false)
      } else {
        setIsErr(true)
      }
    } catch {
      setIsErr(true)
    } finally {
      setIsSubmitted(false)
      setIsLoading(true)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    resetMovieList()
    setIsSubmitted(true)
    setCurrPage(1)

    if (currPage === 1) {
      loadMovies(1)
    }
  }

  const loadMore = () => {
    setCurrPage((prev) => prev + 1)
  }

  useEffect(() => {
    loadMovies(currPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage])

  useEffect(() => {
    let observer: IntersectionObserver

    if (pageEnd.current) {
      observer = new IntersectionObserver(
        async (entries) => {
          const target = entries[0]

          if (target.isIntersecting) {
            if ((currPage + 1) * 10 >= totalResults) {
              setIsLoading(false)
              observer.unobserve(pageEnd.current as unknown as Element)
            } else {
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
        {movieList.length > 0 && (
          <ul className={styles.itemList}>
            {movieList.map((movie, idx) => {
              const key = `movie-${idx}`

              const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
              const included = favorites.some((favorite: { Title: string }) => favorite.Title === movie.Title)

              return <Item key={key} movie={movie} included={included} />
            })}
            <li className={styles.observeLi} ref={pageEnd}>
              {isLoading && 'Loading... 😊'}
            </li>
          </ul>
        )}
        {(!movieList.length || isErr) && <div className={styles.errMsg}>검색 결과가 없습니다.</div>}
      </main>
      <TabBar />
    </div>
  )
}

export default Search
