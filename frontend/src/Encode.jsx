import React from 'react'
import './encode.css'
import { combologo, copy, done, dowloadlogo, imagelogo, upload_icon } from './Assets/Assets'
import { useState } from 'react'
import axios from 'axios';
import {motion} from 'framer-motion'
import imageCompression from 'browser-image-compression';
import ImageCompressor from 'image-compressor';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
 
} from "react-share";

const Encode = () => {
  // const shareUrl = 'https://github.com/';
  const title = 'Check out this image!';
  const [url,setUrl]=useState('');
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied1, setCopied] = useState(false);
    const [copied2, setCopied2] = useState(false);
    const [keyArray, setKeyArray] = useState([]);
    const [keyString, setKeyString] = useState('');
    const[imgtitle,setImageTitle]=useState('')
  const [filename, setFilename] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
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
  const handleCopy = () => {
    navigator.clipboard.writeText(filename);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopy1 = () => {
    navigator.clipboard.writeText(keyArray.join('-'));
    setCopied2(true);
    setTimeout(() => {
      setCopied2(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = async(e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image preview to the result of the FileReader
        setImagePreview(reader.result);
       
      };
      reader.readAsDataURL(imageFile); // Read the file as a data URL
    }
    
    setImageTitle(imageFile.name)
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // await uploadToServer(compressedFile); // write your own logic
    const filed=blobToFile(compressedFile,'example.jpeg')
    setImagePath(filed)
  } catch (error) {
    console.log(error);
  }
  // const imagepath=e.target.files[0];
  // setImagePath(imagepath)
  };

  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
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

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log(imagePath)
    
  //   let form_data = new FormData();
  //   form_data.append('image', imagePath);
  //   form_data.append('title', message);
  //   form_data.append('content', 'this is random content');
  //   console.log(form_data)
  //   // let url = 'http://localhost:8000/api/encode/';
  //   let url = 'https://stegobackend.onrender.com/api/encode/';
  //   axios.post(url, form_data, {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   })
  //     .then(res => {
  //       // console.log(res.data["en_image"]);
  //       setFilename(res.data["filename"]);
  //       setKeyArray(res.data["key"]);
        
        
  //     })
  //     .catch(err => console.log(err))
  //     console.log(filename)
  //     console.log(keyString)
  //     keyconverter()
      
  // };

  // const keyconverter=()=>{
  //   const keyStr = keyArray.join('-');
  //       setKeyString(keyStr);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    
    // Your existing code
    console.log(imagePath);
    
    let form_data = new FormData();
    form_data.append('image', imagePath);
    form_data.append('title', message);
    form_data.append('content', 'this is random content');
    console.log(form_data);

    if (!imagePath || !message) {
      setLoading(false); // Clear loading state
      alert('Please select an image or enter a message.');
      return;
    }
    
    // let url = 'http://localhost:8000/api/encode/';
    let url = 'https://stegobackend.onrender.com/api/encode/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      setLoading(false); // Clear loading state
      // console.log(res.data["en_image"]);
      setFilename(res.data["filename"]);
      setKeyArray(res.data["key"]);
    })
    .catch(err => {
      setLoading(false); // Clear loading state in case of error
      console.log(err);
    });
  
    console.log(filename);
    console.log(keyString);
    keyconverter();
  };
  
  const keyconverter = () => {
    const keyStr = keyArray.join('-');
    setKeyString(keyStr);
  };


  
  return (
    <div className="bodycontainer">
    <div className='encode_container'>
        <form onSubmit={handleSubmit}>
        <div className="upload_container">
            
        <input type="file" accept="image/*" onChange={handleImageChange} className='image_field' value={formData.title} />
            {/* <motion.div className="upload_image" onClick={()=>{document.querySelector('.image_field').click() }}  whileHover={{cursor:'pointer'}}  >
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
                  <p className='image_title'>{imgtitle}</p>
                </div>
             </div>
            </motion.div>   */}

<motion.div
        className="upload_image"
        onClick={() => {
          document.querySelector('.image_field').click();
        }}
        whileHover={{ cursor: 'pointer' }}
        style={{ position: 'relative', overflow: 'hidden' }} // Ensure the image fits within the container
      >
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensure the image fills the container
            }}
          />
        )}
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
                  <p className='image_title'>{imgtitle}</p>
                </div>
             </div>
      </motion.div>

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

        <motion.div className="encode_button"  whileHover={{scale:1.1,cursor:'pointer'}} whileTap={{scale:0.9}} >
        <button type="submit" className='textenc'>Encode</button>
        </motion.div>
        </form>
         
        <div className='copy_section'>
        <div className="text-container">
        <p className='linktocopy'>{loading ? 'Your encrypted image is getting ready...' : filename}</p>
        <button className="copy-button" onClick={handleCopy}>
        {copied1 ? (
          <img src={done} alt="Copied Logo" />
        ) : (
          <img src={copy} alt="Copy Logo" />
        )}
      </button>
      </div>

      <div className="key-container">
        <p className='linktocopy'>{loading ? 'Your key is generating...' : keyArray.join('-')}</p>
        <button className="copy-button-link" onClick={handleCopy1}>
        {copied2 ? (
          <img src={done} alt="Copied Logo" />
        ) : (
          <img src={copy} alt="Copy Logo" />
        )}
      </button>
      </div>
     
        </div>
       <div className='share_section'>
     
        
        <div className='sharediv'> 

         
            <div className='sharebutton'>
            {/* <motion.button  onClick={handleDownload} className='downloadimage'whileHover={{scale:1.15,cursor:'pointer'}} >
       <div className='download_logo'  >
       <img src={dowloadlogo} alt="BigCo Inc. logo"/>
       </div>
       
        </motion.button> */}
         <motion.div className='face_button' whileHover={{scale:1.15}} >
                {/* Facebook Share Button */}
                <WhatsappShareButton
                    url={filename}
                    quote={title}
                    hashtag="#ExampleHashtag"
                >
                    <WhatsappIcon size={45} round />
                </WhatsappShareButton>
                </motion.div>
              <motion.div className='face_button' whileHover={{scale:1.15}} >
                {/* Facebook Share Button */}
                <FacebookShareButton
                    url={filename}
                    quote={title}
                    hashtag="#ExampleHashtag"
                >
                    <FacebookIcon size={45} round />
                </FacebookShareButton>
                </motion.div>

              <motion.div className='twitter_button'whileHover={{scale:1.15}} >
                {/* Twitter Share Button */}
                <TwitterShareButton
                    url={filename}
                    title={title}
                    hashtags={['ExampleHashtag']}
                >
                    <TwitterIcon size={45} round />
                </TwitterShareButton>
              </motion.div>

              <motion.div className='email_button'whileHover={{scale:1.15}} >
                {/* Email Share Button */}
                <EmailShareButton
                    url={filename}
                    subject={title}
                    body="Check out this site: "
                >
                    <EmailIcon size={45} round />
                </EmailShareButton>
                </motion.div>
            </div>  </div>
       </div>
    </div>
    
    

    
    </div>
  )
}

export default Encode