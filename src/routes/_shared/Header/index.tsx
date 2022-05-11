import { useLocation } from 'react-use'
import styles from './Header.module.scss'

const Header = () => {
  const location = useLocation()

  return (
    <header className={styles.header}>
      <h1>{location.pathname}</h1>
    </header>
  )
}

export default Header
