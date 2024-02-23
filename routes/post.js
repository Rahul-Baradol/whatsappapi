const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const xmlparser = require('express-xml-bodyparser');

const router = express.Router();
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

router.use(xmlparser({
  trim: true, // Trim whitespace from text nodes
  explicitArray: false, // Don't explicitly return node lists as arrays
}));

router.post('/', async (req, res, next) => {
  const { body } = req;

  console.log(req.headers);
  console.log(req.body);
  // console.log(req);
  // let d = req.parser['4']()
  // console.log(d);

  // // if (body.NumMedia > 0) {
    // message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
  //   message.media(goodBoyUrl);
  // } else {
    message = new MessagingResponse().message('Send us an image!');
  // }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
  next();
});

module.exports = router;
