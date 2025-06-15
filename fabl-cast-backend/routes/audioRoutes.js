const express = require('express');
const router = express.Router();

// Define the route for generating a podcast
router.post('/generate-podcast', (req, res) => {
  const { podcastTitle, podcastTopic } = req.body;
  
  if (podcastTitle && podcastTopic) {
    res.status(200).json({ message: "Podcast generated successfully!" });
  } else {
    res.status(400).json({ message: "Error generating podcast" });
  }
});

module.exports = router;
