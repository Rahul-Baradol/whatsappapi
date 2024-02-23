require('dotenv').config({
  path: ".env.local"
})

const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const router = express.Router();
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
const path = require('path')
const fs = require('fs')

const username = process.env.twilioAccountSid;
const password = process.env.twilioAuthToken;

router.post('/', async (req, res, next) => {
  const { body } = req;

  // console.log(body);

  if (body.NumMedia > 0) {
    const fullPath = path.resolve(`./comedy.jpeg`);
    message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
    // message.media(body.MediaUrl0);

    const response = await fetch(body.MediaUrl0, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "Username": username,
        "Password": password
      }
    });
    const fileStream = fs.createWriteStream(fullPath);

    response.body.pipe(fileStream);
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
  next();
});

module.exports = router;
