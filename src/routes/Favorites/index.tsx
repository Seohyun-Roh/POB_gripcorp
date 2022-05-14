import { useMount } from 'hooks'
import { useRecoil } from 'hooks/state'
import { favoriteListState } from 'states/favorite'

import styles from './Favorites.module.scss'
import Header from 'routes/_shared/Header'
import Item from 'routes/_shared/Item'
import TabBar from 'routes/_shared/TabBar'
import { IMovieItem } from 'types/movie'

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useRecoil(favoriteListState)

  useMount(() => {
    setFavoriteList(JSON.parse(localStorage.getItem('favorites') || '[]'))
  })

  return (
    <div className={styles.favorites}>
      <Header title='내 즐겨찾기' />
      <main className={styles.favoritesMain}>
        <ul className={styles.favoritesList}>
          {favoriteList.length !== 0 ? (
            favoriteList.map((favorite: IMovieItem, idx: number) => {
              const key = `favorite-${idx}`

              return <Item key={key} movie={favorite} included />
            })
          ) : (
            <div className={styles.favoritesMsg}>즐겨찾기한 영화가 없습니다.</div>
          )}
        </ul>
      </main>
      <TabBar />
    </div>
  )
}

export default Favorites
