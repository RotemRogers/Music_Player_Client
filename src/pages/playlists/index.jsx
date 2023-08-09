import PlayerContext from '../../PlayerContext'
import axios from 'axios'
import SongCard from '../../components/SongCard'
import { useContext,useEffect, useState } from 'react'
import styles from './style.module.css'
import PlaylistCard from '../../components/PlaylistCard'

function Playlist() {

  const {playlists,setPlaylists} = useContext(PlayerContext)
  const [userName,setUserName] = useState()
  const [search,setSearch] = useState('')
  const [constPlay,setConstPlay] = useState([])

  const options = {
    method: 'GET',
    url: 'http://localhost:1001/playlist/getplaylist',
    params: {
      
    },
    headers: {
      'authorization': "Bearer "+localStorage.getItem('Token')
    }
  };

useEffect(()=>{
  axios.request(options)
  .then((res)=> {
    const endResults = res.data
    setUserName(res.data[0].user.name)
    setPlaylists(endResults)
    setConstPlay(endResults)
    console.log(endResults)})
  .catch((err)=>console.log(err))
},[])

const handleSearch = (e)=>{
  e.preventDefault()
  console.log(search)
  console.log(playlists)
  if(search.length === 0){
    setPlaylists(constPlay)
  }
  if (search.length > 0){
    const filteredPlaylist =  playlists.filter((list)=>{
    if (list.name.toLowerCase().includes(search)) {
      return list
    }
  })
    setPlaylists(filteredPlaylist) 
  }
}

  return (
    <div className={styles.playlist}>
    <h3 className={styles.title}>Showing songs from {userName} Playlists:</h3>
    <form className={styles.search}>
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        <input type="search" placeholder='Search' onChange={((e)=>{setSearch((e.target.value).toLowerCase())})}/>
        </form>
    <div className={styles.video_container}>
    {playlists.map((playlist,index)=> {
        return <PlaylistCard key={index} data = {playlist} />
    })}
    </div>
</div>
  )
}

export default Playlist