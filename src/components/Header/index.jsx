import React, { useEffect } from 'react'
import styles from './style.module.css'
import Logout from '../../pages/Logout'
import { Link } from 'react-router-dom'

function Header() {

  let token = localStorage.getItem('Token')

  useEffect(()=>{
    token = localStorage.getItem('Token')
  },)

  return (
    <div className={styles.header}>
      <div className={styles.loginDiv}>
        {token ? <Logout /> :
       <Link className={styles.linktext} to='/login'>Login</Link>}
       {!token ? <Link className={styles.linktext} to='/register'>Register</Link> : <></>}
       </div>
      <h1>Music Player</h1>
        {/* {user} */}
    </div>
  )
}

export default Header