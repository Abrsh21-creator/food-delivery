import React from 'react'
import { assets } from '../../assets/assets'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h1>እንኳን ደህና መጣችሁ<br/>WELCOME!
        </h1>
       <p className="amharic-text">
  <b>ይዘዙን የሚወዷቸውን ምርጥ የኢትዮጵያ ምግቦች 🤙</b>
</p>

        <button>view menu</button>
        
      </div>
      
    </div>
  )
}

export default Header
