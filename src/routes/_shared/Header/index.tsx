import styles from './Header.module.scss'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
