// const getImage = require("../model/image.model");
const axios = require("axios");

async function httpGetImage(req, res) {
  const response = await axios.get(`https://source.unsplash.com/random`);
  return res.send(response.request.res.responseUrl);
}

async function httpGetJoke(req, res) {
  const response = await axios.get(
    `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`
  );
  return res.send(response.data.joke);
}

module.exports = { httpGetImage, httpGetJoke };
