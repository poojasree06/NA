// client/src/components/VideoList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:5000/api/get_videos');
      console.log(response)
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <Link to={`/videos/${video._id}`}>
              <img src={video.imgUrl} 
              alt={video.description} 
              width="200" />
              <p>{video.title}</p>
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default VideoList;
