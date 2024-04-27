import React, { useState } from 'react'
import './header.css'
import { logo } from './Assets/Assets'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
const Header = () => {
  const[decodeon,setDecodeOn]=useState(true)
  return (
    <div className='header_conatainer'>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <motion.div className="ED_button" whileHover={{scale:1.09}} whileTap={{scale:0.9}} >
          {/* <div className="text">
            Decode
          </div> */}
         {decodeon ? (
        <div>
          {/* Decode button with path */}
         <Link to="/decode" className='linkstyle' >
            <button onClick={()=>{setDecodeOn(!decodeon)}} >Decode</button>
            </Link>
        </div>
      ) : (
        <div>
          {/* Encode button with path */}
        <Link to="/" className='linkstyle'>
            <button onClick={()=>{setDecodeOn(!decodeon)}}>Encode</button>
            </Link>
        </div>
      )}
        </motion.div>
    </div>
  )
}

export default Header