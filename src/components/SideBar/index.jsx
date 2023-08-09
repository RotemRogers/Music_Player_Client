import React from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import VideoPlayer from '../VideoPlayer'

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
        <Link className={styles.linktext} to='/'>Home</Link>
        <Link className={styles.linktext} to='/favorites'>Favorites</Link>
        <Link className={styles.linktext} to='/playlists'>Playlists</Link>
        <div className={styles.player}><VideoPlayer /></div>
    </div>
  )
}

export default SideBar