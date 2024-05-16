const express = require("express");
const { httpGetImage, httpGetJoke } = require("./controller/image.controller");

const app = express();

const port = 8001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/image/*", httpGetImage);
app.get("/joke/*", httpGetJoke);
