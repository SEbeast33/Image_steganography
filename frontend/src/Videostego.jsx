import React, { useState } from 'react';
import axios from 'axios';

const VideoStego = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [frame, setFrame] = useState('');

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleEncode = () => {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', message);
    formData.append('password', password);
    formData.append('frame', frame);

    axios.post('http://127.0.0.1:8000/api/video/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Video encoding successful:', response.data);
      // Handle success response
    })
    .catch((error) => {
      console.error('Error encoding video:', error);
      // Handle error response
    });
  };

  return (
    <div>
      <input type="file" accept="video/mp4" onChange={handleVideoChange} />
      <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Frame" value={frame} onChange={(e) => setFrame(e.target.value)} />
      <button onClick={handleEncode}>Encode Video</button>
    </div>
  );
};

export default VideoStego;
