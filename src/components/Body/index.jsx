import React from 'react'
import styles from './style.module.css'
import { Route,Routes } from 'react-router-dom'
import Home from '../../pages/home'
import Favorites from '../../pages/favorites'
import Login from '../../pages/login'
import Playlists from '../../pages/playlists'
import Register from '../../pages/register'
import PlaylistDisplay from '../../pages/playlistDisplay'

function Body() {
  return (
    <div className={styles.body}>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favorites' element={localStorage.getItem('Token') ? <Favorites/> : <Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/playlists' element={localStorage.getItem('Token') ? <Playlists/> : <Login/>}/>
            <Route path='/playlists/:name' element={<PlaylistDisplay/>}/>
        </Routes>
    </div>
  )
}

export default Body