import styles from './Search.module.scss'

import { IMovieItem } from 'types/movie.d'

interface Props {
  movie: IMovieItem
}

const Item = ({ movie }: Props) => {
  const { Title: title, Year: year, Type: type, Poster: poster } = movie
  return (
    <li className={styles.item}>
      <img src={poster} alt='poster' />
      <div className={styles.content}>
        <p className={styles.contentTitle}>{title}</p>
        <div className={styles.contentDetail}>
          <span>{type}</span>
          <span>{year}</span>
        </div>
      </div>
      <div className={styles.favBtn}>✨</div>
    </li>
  )
}

export default Item
