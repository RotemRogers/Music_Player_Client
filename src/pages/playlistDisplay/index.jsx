import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import SongCard from "../../components/SongCard";
import styles from './style.module.css'
import {AiOutlineDelete} from 'react-icons/ai'


function PlaylistDisplay() {
  const [showSongs, setShowSongs] = useState([]);
  const [search,setSearch] = useState('')
  const [constList,setConstList] = useState([])
  const params = useParams();
  const navigate = useNavigate()

  const options = {
    method: "GET",
    url: `http://localhost:1001/playlist/showplaylistsongs/${params.name}`,
    params: {
      name: params,
    },
    headers: {
      authorization: "Bearer " + localStorage.getItem("Token"),
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setShowSongs(res.data[0].songs);
        setConstList(res.data[0].songs)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e)=>{
    e.preventDefault()
    console.log(search)
    if(search.length === 0){
      setShowSongs(constList)
    }
    if (search.length > 0){
     const filteredPlaylist =  showSongs.filter((song)=>{
      if (song.title.toLowerCase().includes(search)) {
        return song
      }
     })
     setShowSongs(filteredPlaylist) 
    }
    }
  const handleDelete = (e)=>{
    e.preventDefault()

    const optionsDel = {
        method: "PUT",
        url: `http://localhost:1001/playlist/deleteplaylist/${params.name}`,
        params: {
            name: params
        },
        headers: {
          authorization: "Bearer " + localStorage.getItem("Token"),
        }
      };

    axios.request(optionsDel)
    .then((res)=>{
        console.log(res.data)
        navigate('/playlists')
    })
    .catch((err)=>{
        console.log(err)
    })

  }

  return (
    <div className={styles.playlist}>
      <h3 className={styles.title}>{params.name}</h3>
      <form className={styles.search}>
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        <input type="search" placeholder='Search' onChange={((e)=>{setSearch((e.target.value).toLowerCase())})}/>
        </form>
        <AiOutlineDelete className={styles.delete} onClick={handleDelete}/>
      <div className={styles.video_container}>
      {showSongs.map((song)=>{
        return <SongCard key={song.id} video={song}/>
      })}
      </div>
    </div>
  );
}

export default PlaylistDisplay;
