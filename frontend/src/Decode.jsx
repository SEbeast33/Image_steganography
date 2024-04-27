import React, { useState } from 'react';
import axios from 'axios';
import { combologo, dowloadlogo, imagelogo, upload_icon } from './Assets/Assets'
import {motion} from 'framer-motion'

const Decode = () => {
  const [image, setImage] = useState(null);
  const [decodedText, setDecodedText] = useState('');
  const [keyArray, setKeyArray] = useState([123, 456, 789, 1011]);
  const [link, setLink] = useState('');
  const[imgtitle,setImageTitle]=useState('')

  const handleKeyChange = (index, value) => {
    const newArray = [...keyArray];
    newArray[index] = value;
    setKeyArray(newArray);
  };


  const handleLinkChange = (event) => {
    const inputValue = event.target.value;
    // Regular expression to validate URL format
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(inputValue)) {
      setLink(inputValue);
    } else {
      // Handle invalid URL format
      setLink('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageTitle(e.target.files[0].name)
  };

  const handleDecode = () => {
    const formData = new FormData();
    console.log(link)
    console.log(keyArray)
    formData.append('link', link);
    formData.append('key_array', keyArray);
    
    axios.post('https://stegobackend.onrender.com/api/decodewithlink/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setDecodedText(response.data.decodedtext);
    })
    .catch((error) => {
      console.error('Error decoding image:', error);
    });
  };

  return (
    <div className='decode_box'>
    <div className='decode_container'>
    <div className='decode_area'>
    {/* <input type="file" accept="image/*" onChange={handleImageChange} className='image_field1'  />
        <div className="upload_image" onClick={()=>{document.querySelector('.image_field1').click() }}>
             <div className="image_logo">
              <img src={imagelogo} alt="" />
             </div>
             <div className="upload_logo">
                <div className="upload_text">
                    Upload image
                </div>
                <div className="upload_icon">
                    <img src={upload_icon} alt="" />
                </div>
                <div>
                  {imgtitle}
                </div>
             </div>
            </div>  */}
<div className='link_input-text'>
<input
        type="text"
        id="linkInput"
        value={link}
        onChange={handleLinkChange}
        placeholder="https://example.com"
        className='decode_input'
        
      />   </div>
      {/* <button onClick={handleDecode}>Decode Image</button> */}
     <div className='key_boxes'>
      
      
        {keyArray.map((value, index) => (
          <div>
          <input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleKeyChange(index, parseInt(e.target.value, 10))}
            placeholder={`Key element ${index + 1}`}
            className='input_fields'
            required
          /> -</div>
        ))} </div>

      <motion.div className="decode_button" whileHover={{scale:1.09,cursor:'pointer'}} whileTap={{scale:0.9}} >
        <motion.button type="submit" className='textenc' onClick={handleDecode}  >Decode</motion.button>
        </motion.div>
        <div className="decodetextsection">
      <div className='decode_text' >
        Decoded text is:
      {decodedText}
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Decode;
