import React, { useState } from 'react'
import './header.css'
import { logo } from './Assets/Assets'
import { Link } from 'react-router-dom'
const Header = () => {
  const[decodeon,setDecodeOn]=useState(true)
  return (
    <div className='header_conatainer'>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <Link to="/video">video encode</Link>
        <div className="ED_button">
          {/* <div className="text">
            Decode
          </div> */}
         {decodeon ? (
        <div>
          {/* Decode button with path */}
         <Link to="/decode" >
            <button onClick={()=>{setDecodeOn(!decodeon)}} >Decode</button>
            </Link>
        </div>
      ) : (
        <div>
          {/* Encode button with path */}
        <Link to="/">
            <button onClick={()=>{setDecodeOn(!decodeon)}}>Encode</button>
            </Link>
        </div>
      )}
        </div>
    </div>
  )
}

export default Header