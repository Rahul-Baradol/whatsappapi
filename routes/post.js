require('dotenv').config({
  path: ".env.local"
})

const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const twiliomain = require('twilio')

const router = express.Router();
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
const path = require('path')
const fs = require('fs')

const username = process.env.twilioAccountSid;
const password = process.env.twilioAuthToken;

const twilio = new twiliomain.Twilio(username, password);

router.post('/', async (req, res, next) => {
  const { body } = req;

  // console.log(body);

  let images = []

  if (body.NumMedia > 0) {
    for (let i = 0; i < body.NumMedia; i++) {
      const url = body[`MediaUrl${i}`]
      const accessibleUrl = "https://" + username + ":" + password + url.slice(8);
      images.push(accessibleUrl);

      console.log(accessibleUrl);

      message = new MessagingResponse().message("Got the image!");
      message.media(goodBoyUrl);
    }
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
  next();
});

module.exports = router;
