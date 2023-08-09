import axios from "axios";
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import PlayerContext from "../../PlayerContext";
import styles from './style.module.css'

function Login() {

  const [loginData,setLoginData] = useState({})
  const navigate = useNavigate()

  const {user,setUser} = useContext(PlayerContext)

  const handleInput  = (e)=>{
    e.preventDefault()
    const {name,value} = e.target
    setLoginData((prevData)=>({...prevData,[name]:value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await axios.post('http://localhost:1001/user/login',loginData)
    .then((res)=> {
      localStorage.setItem("Token",res.data.token);
      setUser(res.data.user);
      navigate('/');
      }) // לשלוח לקונטקסט של יוזר לשימוש בעתיד
    .catch((err)=>console.log(err))
  }

  return (
    <div className={styles.login_container}>
      <h3 className={styles.title}>Login :</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email : </label><br />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleInput}
          ></input>
        </div>
        <div>
          <label>Password : </label><br />
          <input
            type="text"
            placeholder="User name"
            name="password"
            onChange={handleInput}
          ></input><br />
           <button
                type='submit'    
                >
                Login
            </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
