// client/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
 const uploadFile=async(type)=>{
  const formData = new FormData();
  formData.append('file',type==='image'?thumbnail:video)
    formData.append("upload_preset",type==='image'?'images_preset':'videos_preset');
    try{
      let cloudName=process.env.REACT_APP_CLOUD_NAME;
      console.log(cloudName)
      let resourceType=type==='image'? 'image':'video';
      let api=`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res=await axios.post(api,formData);
      const {secure_url}=res.data;
      console.log(secure_url);
      return secure_url;
    }catch(error){
      console.log(error)
    }

 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const imgUrl=await uploadFile('image');
      const videoUrl=await uploadFile('video');
      const res=await axios.post('http://localhost:5000/api/videos',{imgUrl,videoUrl,title,description});
      setThumbnail(null);
      setVideo(null)
      console.log("success");
      console.log(res.data)
      navigate("/videos")
    }catch(error){
      console.log(error)
    }
    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('description', description);
    // formData.append('thumbnail', thumbnail);
    // formData.append('video', video);
    
  //   try {
        
  //   for (let [key, value] of formData.entries()) {
  //       console.log(`${key}: ${value}`);
  //   }
  //  // Print detailed file info
  //   if (thumbnail) {
  //     console.log('Thumbnail:', {
  //       name: thumbnail.name,
  //       type: thumbnail.type,
  //       size: thumbnail.size,
  //     });
  //   }
  //   if (video) {
  //     console.log('Video:', {
  //       name: video.name,
  //       type: video.type,
  //       size: video.size,
  //     });
  //   }
  //   const response = await axios.post('http://localhost:5000/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
