// src/models/video.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust if your database connection is different

const Video = sequelize.define('Video', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  youtube_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // We're handling timestamps manually
});

module.exports = Video;