import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SongCard from '../../components/SongCard';
import styles from './style.module.css'

function Home() {

    const defValue = "Bob Dylan"

    const [videos,setVideos] = useState([]);
    const [search,setSearch] = useState(defValue)

    const options = {
        method: 'GET',
        url: 'https://simple-youtube-search.p.rapidapi.com/search',
        params: {
          query: search,
          safesearch: 'false'
        },
        headers: {
          'X-RapidAPI-Key': 'aed9a1e2b4msh3c4a9018d151fffp15958cjsn32320eb6ce6b',
          'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
        }
      };

    useEffect(()=>{
        axios.request(options)
        .then((res)=> setVideos(res.data.results))
        .catch((err)=>console.log(err))
    },[])

    const handleSearch = async (e)=>{
        if (search.length > 0){
        e.preventDefault()
        await axios.request(options)
        .then((res)=> setVideos(res.data.results))
        .catch((err)=>console.log(err))
        }
        else {
            setSearch(defValue)
        }
    }

  return (
    <div className={styles.home}>
        <h2 className={styles.title}>Showing songs from {search}:</h2>
        <form className={styles.search}>
            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            <input type="search" placeholder='Search' onChange={((e)=>{setSearch(e.target.value)})}/>
            </form>
        <div className={styles.video_container}>
        {videos.map((video)=> {
            return <SongCard key={video.id} video = {video} />
        })}
        </div>
    </div>
  )
}

export default Home