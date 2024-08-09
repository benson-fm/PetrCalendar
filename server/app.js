const express = require('express')
const app = express()
const port = 3000
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const axios = require("axios");
const { ocrSpace } = require('ocr-space-api-wrapper');

app.use(cors());
app.use(express.json());


// using multer to upload file to server 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.json({message: "Hello World!"})
});

// this is where you would upload the file to the server
app.post('/api/upload', upload.single('file'), async (req, res) => {
  //res.json(req.file);
  try {
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const apiUrl = "https://api.ocr.space/parse/image";
    // const response = await axios.post(apiUrl, {
    //     file: fileContent}, {
    //         headers: {
    //             isOverlayRequired: true,
    //             apikey: "K81624200688957",
    //             language: "eng",
    //             filetype: "PNG",
    //         }
    //     });

    const response = await ocrSpace(filePath, { apiKey: "K81624200688957", isOverlayRequired: true});
    fs.unlinkSync(filePath);
    res.json({ message: 'File uploaded and processed', data: response });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing file' });

}
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});