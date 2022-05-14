import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './TabBar.module.scss'

const TabBar = () => {
  return (
    <nav className={styles.tabBar}>
      <ul>
        <li>
          <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <i>🔍</i>
            <span>검색</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <i>❤️</i>
            <span>즐겨찾기</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default TabBar
