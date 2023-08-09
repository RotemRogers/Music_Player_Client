import PlayerContext from '../../PlayerContext'
import axios from 'axios'
import SongCard from '../../components/SongCard'
import { useContext,useEffect, useState } from 'react'
import styles from './style.module.css'

function Favorites() {

  const {favorites,setFavorites} = useContext(PlayerContext)
  const [userName,setUserName] = useState()
  const [search,setSearch] = useState('')
  const [constFav,setConstFav] = useState([])

  const options = {
    method: 'GET',
    url: 'http://localhost:1001/favorites/getfavorites',
    params: {
      
    },
    headers: {
      'authorization': "Bearer "+localStorage.getItem('Token')
    }
  };

useEffect(()=>{
  axios.request(options)
  .then((res)=> {
    console.log(res.data[0]._id)
    const endResults = res.data.map(({songs})=>songs[0])
    setUserName(res.data[0].user.name)
    setFavorites(endResults)
    setConstFav(endResults)
    })
  .catch((err)=>console.log(err))
},[])

const handleSearch = (e)=>{
    e.preventDefault()
    console.log(search)
    if(search.length === 0){
      setFavorites(constFav)
    }
    if (search.length > 0){
     const filteredFavorites =  favorites.filter((song)=>{
      if (song.title.toLowerCase().includes(search)) {
        return song
      }
     })
     setFavorites(filteredFavorites) 
    }
}

  return (
    <div className={styles.favorites}>
    <h2 className={styles.title}>Showing songs from {userName} favoriets list:</h2>
    <form className={styles.search}>
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        <input type="search" placeholder='Search' onChange={((e)=>{setSearch((e.target.value).toLowerCase())})}/>
        </form>
    <div className={styles.video_container}>
    {favorites.map((video,index)=> {
        return <SongCard delete={true} key={index} video = {video} />
    })}
    </div>
</div>
  )
}

export default Favorites