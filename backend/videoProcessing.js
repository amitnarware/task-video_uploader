const videoQueue = require('./VideoQueue'); // This is the Bull queue setup
const sendEmail = require('./sendEmail');   // Email sending logic
const sendNotification = require('./sendNotificaion'); // In-app notification logic

// Event listener when the job becomes active (starts processing)
videoQueue.on('active', async (job) => {
  try {
    console.log(`Processing video: ${job.data.videoPath}`);

    // Send email or notification to the user about job being active
    await sendEmail({
      to: job.data.email, // Assuming job contains email
      subject: 'Your video processing has started',
      message: `Your video at ${job.data.videoPath} is now being processed.`,
    });

    await sendNotification({
      userId: job.data.userId, // Assuming job contains a userId
      message: `Your video processing has started for: ${job.data.videoPath}`,
    });
  } catch (error) {
    console.error('Error sending notification on active job:', error);
  }
});

// Event listener when the job is completed (successfully processed)
videoQueue.on('completed', async (job) => {
  try {
    console.log(`Completed video: ${job.data.videoPath}`);

    // Send email or notification to the user about job completion
    await sendEmail({
      to: job.data.email,
      subject: 'Your video processing is complete',
      message: `Your video at ${job.data.videoPath} has been successfully processed.`,
    });

    await sendNotification({
      userId: job.data.userId,
      message: `Your video processing is complete for: ${job.data.videoPath}`,
    });
  } catch (error) {
    console.error('Error sending notification on completed job:', error);
  }
});

// Optional: Handle failed jobs
videoQueue.on('failed', async (job, err) => {
  try {
    console.log(`Failed video: ${job.data.videoPath}, Error: ${err.message}`);

    // Send email or notification to the user about job failure
    await sendEmail({
      to: job.data.email,
      subject: 'Your video processing has failed',
      message: `Your video at ${job.data.videoPath} failed to process. Please try again.`,
    });

    await sendNotification({
      userId: job.data.userId,
      message: `Your video processing failed for: ${job.data.videoPath}. Error: ${err.message}`,
    });
  } catch (error) {
    console.error('Error sending notification on failed job:', error);
  }
});

module.exports = videoQueue