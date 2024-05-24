import express from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
//fileURLToPath() : gives absolute path of the current file.
//path.dirname() : gives the directory of a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(__filename);

app.use(express.json());

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/urlForm.html");
});

app.post("/url-shortner", (req, res) => {
  const shortUrl = nanoid(8);
  console.log(shortUrl);

  const urlMap = {
    [shortUrl]: req.body.url,
  };
  /**
   * reading from the file using readFileSync() which don't require callback to read data
   * read the json from the file, and need to parse it to json.
   * and add the new shortUrl to map as a key and req.body.url(actual url) as a value;
   */
  const urlFileData = fs.readFileSync("urlmap.json", { encoding: "utf-8" });
  const urlFileDataJson = JSON.parse(urlFileData);
  urlFileDataJson[shortUrl] = req.body.url;

  console.log(urlMap);
  console.log(Object.keys(urlMap).length);

  //write to the file,stringify the json data before writing.
  fs.writeFileSync("urlmap.json", JSON.stringify(urlFileDataJson));
  res.json({
    success: true,
    data: `http://localhost:3001/${shortUrl}`,
  });
  //   res.send(shortUrl);
});

app.get("/:shortUrl", (req, res) => {
  const fileData = fs.readFileSync("urlmap.json", {encoding:'utf-8'});
// data is always stored as string in file we need to parse it as json
  const fileDataJson = JSON.parse(fileData);
  const shortUrl = req.params.shortUrl;
  const longUrl = fileDataJson[shortUrl];
  if(!longUrl){
    return res.status(404).json({success:false, message:'Short URL not found'})
  }
  res.redirect(longUrl)
  res.json({message:"Short url received"})
});

app.listen(3001, () => {
  console.log("listening to incoming request");
});
