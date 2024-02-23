const express = require('express');
const cors = require('cors')
const app = express();
const postRouter = require('./routes/post');

// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json());


// Custom router handling the /message endpoint
app.use('/message', postRouter);

// Start the server
const PORT = 8000;

app.get('/', (req, res) => {
   res.json({
      status: "alive"
   })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app

// // Download the helper library from https://www.twilio.com/docs/node/install
// // Find your Account SID and Auth Token at twilio.com/console
// // and set the environment variables. See http://twil.io/secure
// require('dotenv').config({
//    path: ".env.local"
// })

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const phoneno = process.env.PHONENO

// const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({
//          from: 'whatsapp:+14155238886',
//          body: 'Hello, there!',
//          to: 'whatsapp:+919880050970'
//        })
//       .then(message => console.log(message.sid));
