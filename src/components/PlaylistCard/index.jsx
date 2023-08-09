import React, { useContext } from 'react'
import styles from './style.module.css'
import PlayerContext from '../../PlayerContext'
import { useNavigate } from 'react-router-dom'

function PlaylistCard(props) {

    const navigate = useNavigate()

    const {playlist} = useContext(PlayerContext)

    const handleClick = () =>{
      navigate(`/playlists/${props.data.name}`)
    }

  return (
    <div className={styles.playlistCard} onClick={handleClick}>
        <h4>{props.data.name}</h4>
        {/* <img src={props.img.url} className={styles.thumbnail}/> */}

    </div>
  )
}

export default PlaylistCard