import React from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

function Logout() {
const navigate = useNavigate()

const handelLogout = () => {
    localStorage.removeItem('Token')
    navigate('/')
}
  return (
    <div 
    onClick={handelLogout}
    className={styles.logout}>
        Logout
    </div>
  )
}

export default Logout