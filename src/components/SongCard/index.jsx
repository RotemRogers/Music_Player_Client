import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import { Link,useNavigate } from 'react-router-dom'
import PlayerContext from '../../PlayerContext'
import AddToPlaylist from '../AddToPlaylist'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart,AiOutlineDelete } from "react-icons/ai";

function SongCard(props) {

  const [favorite, setFavorite] = useState(false);

  const navigate = useNavigate()

  const {setVideoDetails} = useContext(PlayerContext)

  const handleFavorite = () => {
    setFavorite(!favorite);
    const data = {
      thumbnail: props.video.thumbnail,
      title: props.video.title,
      duration_formatted: props.video.duration_formatted,
      id: props.video.id,
      url: props.video.url,
    };
    axios
      .post("http://localhost:1001/song/addtofavorites",data, {headers : {authorization : "Bearer "+localStorage.getItem('Token')}})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  const handleDelete =() => {

    const optionsDel = {
      method: "PUT",
      url: `http://localhost:1001/favorites/removefavorite`,
      params: {
      },
      headers: {
        authorization: "Bearer " + localStorage.getItem("Token"),
      },
      data : {
        songId:props.video._id
      }
    };

    axios.request(optionsDel)
    .then((res)=>{
        console.log(res.data)
        navigate('/favorites')
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  return (
    <div className={styles.songcard}>
        <img src={props.video.thumbnail.url} className={styles.thumbnail}/>
        <h4>Title:</h4>{props.video.title}
        <h4>Duration:</h4>{props.video.duration_formatted}
        <div className={styles.delete_song}>
        {props.delete && <AiOutlineDelete 
        className={styles.delete_button}
        onClick={handleDelete}
        />}
        </div>
        <div className={styles.controls}>
       <AddToPlaylist video={props.video} />
        <button onClick={()=>setVideoDetails(props.video)}>Play</button>
        <div onClick={handleFavorite} >
          {favorite == false ? <AiOutlineHeart className={styles.favorites}/> : <AiFillHeart className={styles.favorites}/>}
        </div>
       </div>
        
    </div>
  )
}

export default SongCard