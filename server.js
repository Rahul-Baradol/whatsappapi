const express = require('express');
const app = express();
const postRouter = require('./post');

// Middleware to parse JSON bodies
app.use(express.json());

// Custom router handling the /message endpoint
app.use('/message', postRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
