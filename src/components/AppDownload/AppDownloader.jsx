import React from 'react'
import './AppDownloader.css'
import { assets } from '../../assets/assets'
const AppDownloader = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Download our app for the best experience! <br />Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="Play Store" />
            <img src={assets.app_store} alt="App Store" />
        </div>
      
    </div>
  )
}

export default AppDownloader
