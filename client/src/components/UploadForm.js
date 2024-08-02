import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners'; // Import the spinner

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const uploadFile = async (type) => {
    const formData = new FormData();
    formData.append('file', type === 'image' ? thumbnail : video);
    formData.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');
    try {
      let cloudName = process.env.REACT_APP_CLOUD_NAME;
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, formData);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before starting uploads
    try {
      const imgUrl = await uploadFile('image');
      const videoUrl = await uploadFile('video');
      const res = await axios.post('https://na-2.onrender.com/api/videos', { imgUrl, videoUrl, title, description });
      setThumbnail(null);
      setVideo(null);
      console.log("success");
      console.log(res.data);
      navigate("/videos");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state when done
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Video</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="50" required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength="200" required></textarea>
      </div>
      <div>
        <label>Thumbnail:</label>
        <input type="file" accept="image/jpeg,image/png" onChange={(e) => setThumbnail(e.target.files[0])} required />
      </div>
      <div>
        <label>Video:</label>
        <input type="file" accept="video/mpg,video/avi,video/mp4" onChange={(e) => setVideo(e.target.files[0])} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {loading && <ClipLoader color="#28a745" loading={loading} size={30} />} {/* Show the spinner when loading */}
    </form>
  );
};

export default UploadForm;
