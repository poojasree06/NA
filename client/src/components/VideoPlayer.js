// client/src/components/VideoPlayer.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.get(`http://localhost:5000/api/get_videos/${id}`);
      setVideo(response.data);
    };

    fetchVideo();
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <video src={video.videoUrl} controls autoPlay />
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
