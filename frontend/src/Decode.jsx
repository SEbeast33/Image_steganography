import React, { useState } from 'react';
import axios from 'axios';

const Decode = () => {
  const [image, setImage] = useState(null);
  const [decodedText, setDecodedText] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDecode = () => {
    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:8000/api/decode/', formData, {
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
    <div>
      <h2>Decode Component</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleDecode}>Decode Image</button>
      <div>
        <h3>Decoded Text:</h3>
        <p>{decodedText}</p>
      </div>
    </div>
  );
};

export default Decode;
