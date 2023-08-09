import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from 'axios';
import { useContext } from 'react';
import PlayerContext from '../../PlayerContext';


function AddToPlaylist(props) {
    const { playlists, setPlaylists } = useContext(PlayerContext);

    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false);
    const [isActive,setIsActive] = useState(false)
    
//This pulls the playlist names from Mongo
    const playlistOptions = {
        method: 'GET',
        url: 'http://localhost:1001/playlist/getplaylist',
        params: {
        },
        headers: {
            'authorization': "Bearer " + localStorage.getItem('Token')

        }
    }

    useEffect(() => {
        axios.request(playlistOptions)
            .then((res) => {
                const endResult = res.data
                setPlaylists(endResult)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [])

//This is to add the song to the playlist
    
    const toggleDropdown = () => {
        setIsVisible((prev) => !prev);
        setIsActive(true)
    };

    // const handleSelect = (option) => {
    //     setPlayName(option);
    //     setIsVisible(false);
    // };

    //This sends the selected playlist name along with the song to Mongo


    const handleClick = async (name) => {
   
        const details = {
            name: name,
            thumbnail: props.video.thumbnail,
            title: props.video.title,
            duration_formatted: props.video.duration_formatted,
            id: props.video.id,
            url: props.video.url,
        };

        const options = {
            method: 'POST',
            url: 'http://localhost:1001/playlist/addtoplaylist',
            params: {},
            headers: {
                'authorization': "Bearer " + localStorage.getItem('Token'),
            },
            data: details,
        };
    
        setIsVisible(false);

        await axios
            .request(options)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div>
            <IoIosAddCircleOutline onClick={toggleDropdown} className={styles.addToPlaylist}/>
            {isVisible && (
                <div className={`${styles.dropdown} ${isActive ? styles.show : ''}`}>
                <div className={styles.dropdown_menu}>
                    <div className={styles.close} onClick={()=>{setIsVisible(false)}}>x</div>
                    {loading && "Loading, Please Wait"}
                    <ul><h4>Choose playlist</h4>
                        {!loading && playlists.map((playlist,index) => {
                        return  <li key={index} onClick={() => {
                                handleClick(playlist.name)
                            }}>{playlist.name}</li>
                    })}
                    <input 
                    type="search" 
                    placeholder='New playlist'
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            handleClick(e.target.value)
                        }
                    }}
                    />
                    </ul>
                </div>
                </div>
            )}
        </div>
    );
}

export default AddToPlaylist;