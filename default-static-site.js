const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080; // Use process.env.PORT

app.use(express.static(path.join(__dirname, 'wwwroot'))); // Serve from 'wwwroot'

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wwwroot', 'index.html')); // Serve index.html for SPA routing
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
