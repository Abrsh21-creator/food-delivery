import React,{ useState} from 'react'
import './login.css'
import { assets } from '../../assets/assets'

const Login = ({ setShowlogin }) => {
    const [currState, setCurrState]=useState("log in")
  return (
    <div className='login-popup'>
    
      <form className="login-popup-container">
      <div className="login-popup-title">
      <h2>{currState}</h2>
      <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currState==="log in" ? <></> : <input type="text" placeholder="Your name" required />}
        
        <input type="email" placeholder="Your email" required />
        <input type="password" placeholder="Your password" required />
      </div>
      <button>{currState==="sign up" ? "create account" : "log in"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>I agree to the Terms of Service and Privacy Policy.</p>
      </div>
      {
        currState==="log in" ? <p>Create a new account? <span onClick={()=>setCurrState("sign up")}>Click here</span></p> : <p>Already have an account? <span onClick={()=>setCurrState("log in")}>Log here</span></p>
      }
      
      </form>
    </div>
  )
}

export default Login
