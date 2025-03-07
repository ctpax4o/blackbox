require('dotenv').config();
const express = require('express');
const app = express();
const usersRouter = require('./src/routes/users');
const videosRouter = require('./src/routes/videos');
const oauthRouter = require('./src/routes/oauth');
const sequelize = require('./src/database');

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Models
const User = require('./src/models/user');
const Video = require('./src/models/video');

// Sync User table (without dropping it)
User.sync({ force: false })
  .then(() => console.log('User table synced'))
  .catch(err => console.error('Error syncing user table:', err));

// Sync Video table
Video.sync({ force: false })
  .then(() => console.log('Video table synced'))
  .catch(err => console.error('Error syncing video table:', err));

app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/videos', videosRouter);
app.use('/api/oauth', oauthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});