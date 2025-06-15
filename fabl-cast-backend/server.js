const express = require('express');
const cors = require('cors');
const audioRoutes = require('./routes/audioRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('🎧 Welcome to Fabl Cast API');
});

// Mount your audio routes here
app.use('/api', audioRoutes);  // This should handle routes like /api/generate-podcast

app.use(errorHandler);  // Handle errors if needed

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
