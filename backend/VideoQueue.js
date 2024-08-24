const Queue = require('bull');

const videoQueue = new Queue('video processing', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Add a processor for the queue
videoQueue.process(async (job) => {
  const { videoPath } = job.data;

  // Logic for processing the video
  console.log(`Processing video: ${videoPath}`);
  // Simulate video processing
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
  return { message: 'Video processed successfully' };
});

module.exports = videoQueue;
