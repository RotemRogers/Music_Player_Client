import { useState } from 'react'
import './App.css'
import Layout from './Layout'
import PlayerContext from './PlayerContext'

function App() {

  const [videoDetails,setVideoDetails] = useState('')
  const [saveSong,setSaveSong] = useState()
  const [user,setUser] = useState()
  const [favorites,setFavorites] = useState([])
  const [playlists,setPlaylists] = useState([])

  return (
    <PlayerContext.Provider value={{videoDetails,setVideoDetails,saveSong,setSaveSong,user,setUser,favorites,setFavorites,playlists,setPlaylists}}>
  <div>
    <Layout/>
  </div>
  </PlayerContext.Provider>
  )
}

export default App
