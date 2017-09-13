import express from 'express';
const router = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });
  
  module.exports = routes;