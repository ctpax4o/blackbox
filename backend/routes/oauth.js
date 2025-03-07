const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const oauth2Client = require('../config/oauthClient'); // See step 3.2

// Route to initiate OAuth flow
router.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
  });
  res.redirect(authUrl);
});

// Route to handle OAuth callback
router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Save tokens securely (e.g., in user session or database)
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;