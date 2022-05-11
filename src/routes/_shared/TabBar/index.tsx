import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './TabBar.module.scss'

const TabBar = () => {
  return (
    <nav className={styles.tabBar}>
      <ul>
        <li>
          <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='/favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default TabBar
