
// import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
function App() {
  return (
    // <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UploadForm/>}/>
      <Route path="/videos" element={<VideoList/>} />
      <Route path="/videos/:id" element={<VideoPlayer/>} />
    </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;





