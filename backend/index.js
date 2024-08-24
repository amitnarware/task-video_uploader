const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const videoQueue = require('./videoProcessing'); // Import the video queue from videoProcessing.js

const app = express();

app.use(cors());

// Middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/videoUploads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint to enqueue video for processing
app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = req.file.path;
  // You can pass user data like email or userId here
  videoQueue.add({ videoPath, email: 'amitnarware40@gmail.com', userId: '12345' });
  res.json({ success: true, message: 'Video added to queue' });
});

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));


