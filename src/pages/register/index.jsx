import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './style.module.css'

function Register() {

    const [data,setData] = useState({})
    const navigate = useNavigate()

    const handleInput = (e)=>{
        e.preventDefault()
        const {name,value} = e.target
        setData((pervData) => ({...pervData, [name] : value}))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        axios.post('http://localhost:1001/user/register',data)
        .then((res)=> navigate('/login'))
        .catch((err)=>console.log(err))
    }

  return (
    <div className={styles.Register_container}>
        <h3 className={styles.title}>Register</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>User name : </label><br />
                <input 
                type="text" 
                placeholder='User name'
                name='name'
                required
                onChange={handleInput}></input>
            </div>
            <div>
                <label>Password : </label><br />
                <input 
                type="password" 
                placeholder='Password'
                name='password'
                required
                onChange={handleInput}></input>
            </div>
            <div>
                <label>Email : </label><br />
                <input 
                type="text" 
                placeholder='Email'
                name='email'
                required
                onChange={handleInput}></input>
            </div>
            <button
                type='submit'    
                >
                Register
            </button>
        </form>
    </div>
  )
}

export default Register