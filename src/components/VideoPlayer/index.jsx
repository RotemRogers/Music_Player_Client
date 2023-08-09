import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import PlayerContext from "../../PlayerContext";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";

function VideoPlayer() {
  const { videoDetails } = useContext(PlayerContext);
  const playerRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (playerReady && videoDetails.id) {
      playerRef.current?.seekTo(0); // seek to the biggining of the song
      playerRef.current?.getInternalPlayer().playVideo();
    }
  }, [playerReady, videoDetails.id]);

  const handlePlay = () => {
    if (playerReady) {
      playerRef.current?.getInternalPlayer().playVideo();
    }
  };

  const handlePause = () => {
    if (playerReady) {
      playerRef.current?.getInternalPlayer().pauseVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    if (playerReady) {
      playerRef.current?.getInternalPlayer().setVolume(volume * 100);
    }
  };

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const handleFastForward = () => {
    if (playerReady) {
      const currentTime = playerRef.current?.getCurrentTime();
      const duration = playerRef.current?.getDuration();
      const newTime = currentTime + 10;
    }
    if (newTime <= duration) {
      playerRef.current?.seekTo(newTime);
    } else {
      playerRef.current?.seekTo(duration);
    }
  };

  const handleRewind = () => {
    if (playerReady) {
      const currentTime = playerRef.current?.getCurrentTime();
      const newTime = currentTime - 10;
      if (newTime <= 0) {
        playerRef.current?.seekTo(newTime);
      } else {
        playerRef.current?.seekTo(0);
      }
    }
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    const data = {
      thumbnail: videoDetails.thumbnail,
      title: videoDetails.title,
      duration_formatted: videoDetails.duration_formatted,
      id: videoDetails.id,
      url: videoDetails.url,
    };
    axios
      .post("http://localhost:1001/song/addtofavorites",data, {headers : {authorization : "Bearer "+localStorage.getItem('Token')}})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={styles.player_container}>
      <div className={styles.window}>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoDetails.id}`}
        playing={playerReady} // start playing when player ready
        onReady={handlePlayerReady} // set player ready to true
        volume={1}
        width="100%"
        height="100%"
      /></div>
      <div className={styles.controls}>
        <TbPlayerTrackPrevFilled onClick={handleRewind} />
        <FaPlay onClick={handlePlay} />
        <FaPause onClick={handlePause} />
        <TbPlayerTrackNextFilled onClick={handleFastForward} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          defaultValue={0.7}
          onChange={handleVolumeChange}
        />
        <div onClick={handleFavorite}>
          {favorite == false ? <AiOutlineHeart /> : <AiFillHeart />}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
