const { google } = require('googleapis');
const fs = require('fs');
const Video = require('../models/video'); // Your Video model

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const uploadVideo = async (req, res) => {
  try {
    const accessToken = req.user.accessToken; // Retrieve from user session or database
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const videoPath = req.file.path;
    const videoTitle = req.body.title || 'Untitled Video';
    const videoDescription = req.body.description || '';

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: videoTitle,
          description: videoDescription,
        },
        status: {
          privacyStatus: 'unlisted', // Change to 'public' or 'private' if needed
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    const videoId = response.data.id;
    const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;

    // Save to your database
    const newVideo = await Video.create({
      user_id: req.user.user_id, // From JWT
      entity_id: req.body.entity_id,
      youtube_link: youtubeLink,
      created_at: new Date(),
    });

    fs.unlinkSync(videoPath); // Clean up temporary file

    res.status(201).json({ message: 'Video uploaded successfully', videoId: newVideo.video_id });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadVideo };
