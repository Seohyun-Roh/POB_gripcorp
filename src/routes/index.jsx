import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import Search from './Search'
import Favorites from './Favorites'

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='search' element={<Search />} />
        <Route path='favorites' element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
