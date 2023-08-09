import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import SideBar from '../components/SideBar'
import styles from './style.module.css'
import Footer from '../components/footer'

function Layout() {
  return (
    <div>
        <Header/>
        <div className={styles.container}>
        <SideBar/>
        <Body/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout