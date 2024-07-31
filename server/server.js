const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Schema
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

// Create Video Controller
const createVideo = async (req, res, next) => {
  const { title,description,imgUrl, videoUrl } = req.body;

  if (!imgUrl || !videoUrl) {
    res.status(400);
    return next(new Error("imgUrl & videoUrl fields are required"));
  }

  try {
    const video = await Video.create({
      title,
      description,
      imgUrl,
      videoUrl,
    });

    res.status(201).json({
      success: true,
      video,
    });
    video.save();
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};

// Routes
app.post("/api/videos", createVideo);
// Route to get all videos
app.get('/api/get_videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Route to get a video by ID
app.get('/api/get_videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
