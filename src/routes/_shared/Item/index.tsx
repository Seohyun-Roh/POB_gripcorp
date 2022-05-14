import { useLocation } from 'react-router-dom'
import { useState } from 'hooks'
import { useRecoil } from 'hooks/state'
import { cx } from 'styles'
import { IMovieItem } from 'types/movie.d'
import { favoriteListState } from 'states/favorite'

import styles from './Item.module.scss'

interface Props {
  movie: IMovieItem
  included: boolean
}

const Item = ({ movie, included }: Props) => {
  const location = useLocation()

  const [, setFavoriteList] = useRecoil(favoriteListState)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isIncluded, setIsIncluded] = useState<boolean>(included)

  const { Title: title, Year: year, Type: type, Poster: poster } = movie

  const handleClick = (bool: boolean) => {
    setIsOpen(bool)
  }

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    let newFavorites

    if (!isIncluded) {
      newFavorites = [...favorites, movie]
    } else {
      newFavorites = favorites.filter((favorite: { Title: string }) => favorite.Title !== title)
    }

    if (location.pathname === '/favorites') {
      setIsIncluded(true)
    } else {
      setIsIncluded((prev) => !prev)
    }

    setFavoriteList(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsOpen(false)
  }

  return (
    <li className={styles.item}>
      <div className={styles.itemDiv} role='presentation' onClick={() => handleClick(true)}>
        <img
          src={poster}
          alt='poster'
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = 'https://www.yokogawa.com/public/img/default_image.png'
          }}
        />
        <div className={styles.content}>
          <p className={styles.contentTitle}>{title}</p>
          <div className={styles.contentDetail}>
            <span>{type}</span>
            <span>{year}</span>
          </div>
        </div>
        {isIncluded ? <i>❤️</i> : <i>🤍</i>}
      </div>

      <div className={cx(styles.itemModal, { [styles.isOpen]: isOpen })}>
        <button type='button' className={styles.itemModalBtn} onClick={handleFavoriteClick}>
          {isIncluded ? '즐겨찾기 제거' : '즐겨찾기'}
        </button>
        <button type='button' className={styles.itemModalBtn} onClick={() => handleClick(false)}>
          취소
        </button>
      </div>
    </li>
  )
}

export default Item
