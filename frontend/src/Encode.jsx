import React from 'react'
import './encode.css'
import { combologo, imagelogo, upload_icon } from './Assets/Assets'
import { useState } from 'react'
import axios from 'axios';

const Encode = () => {
    const [imagePath, setImagePath] = useState('');
  const [filename, setFilename] = useState('');
  const [message, setMessage]= useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    path: ''
  });

  const constructImageUrl = (filename) => {
    const baseUrl = ' http://127.0.0.1:8080';
    return `${baseUrl}/${filename}`;
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
   setImagePath(e.target.files[0])
  };
  const handleDownload = async () => {
    try {
        // Fetch the image as a blob
        const response = await fetch(filename);
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a new anchor element
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = blobUrl;
        downloadAnchor.download = 'downloaded_image.png'; // Set the desired file name

        // Append the anchor to the document body and trigger the click event
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();

        // Cleanup: remove the anchor and revoke the blob URL
        document.body.removeChild(downloadAnchor);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let form_data = new FormData();
    form_data.append('image', imagePath);
    form_data.append('title', message);
    form_data.append('content', 'this is random content');
    let url = 'http://localhost:8000/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        // console.log(res.data["en_image"]);
        setFilename(res.data["filename"]);
        
      })
      .catch(err => console.log(err))
      console.log(filename)
  };
  return (
    <div className="bodycontainer">
    <div className='encode_container'>
        <form onSubmit={handleSubmit}>
        <div className="upload_container">
            
        <input type="file" accept="image/*" onChange={handleImageChange} className='image_field' value={formData.title} />
            <div className="upload_image" onClick={()=>{document.querySelector('.image_field').click() }}>
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
             </div>
            </div>   
            <div className="combo_logo">
               <img src={combologo} alt="" />
            </div>
            <div className="text_conatiner">
            <input
            id='title'
        type="text"
        className="textbox"
        placeholder="Enter the secret message"
       
        onChange={handleChange}
      />
      {/* <input type="text" placeholder='Title' id='title' value={formData.title} onChange={handleChange} required className='textbox' /> */}
            </div>
        </div>

        <div className="encode_button">
        <button type="submit" className='textenc'>Encode</button>
        </div>
        </form>
        
        <button  onClick={handleDownload} className='downloadimage'>Download Image</button>
    </div>
    
    </div>
  )
}

export default Encode