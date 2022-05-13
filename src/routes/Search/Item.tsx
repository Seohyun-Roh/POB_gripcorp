/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'hooks'
import { cx } from 'styles'
import { IMovieItem } from 'types/movie.d'

import styles from './Search.module.scss'

interface Props {
  movie: IMovieItem
}

const Item = ({ movie }: Props) => {
  const { Title: title, Year: year, Type: type, Poster: poster } = movie
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = (v: boolean): void => {
    setIsOpen(v)
  }

  return (
    <li className={styles.item}>
      <div className={styles.itemDiv} onClick={() => handleClick(true)}>
        <img src={poster} alt='poster' />
        <div className={styles.content}>
          <p className={styles.contentTitle}>{title}</p>
          <div className={styles.contentDetail}>
            <span>{type}</span>
            <span>{year}</span>
          </div>
        </div>
      </div>
      <div className={cx(styles.itemModal, { [styles.isOpen]: isOpen })}>
        <button type='button' className={styles.itemModalBtn}>
          즐겨찾기
        </button>
        <button type='button' className={styles.itemModalBtn} onClick={() => handleClick(false)}>
          취소
        </button>
      </div>
    </li>
  )
}

export default Item
