const express = require('express')
const app = express()
const port = 3000
const multer = require('multer');
const cors = require('cors');

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
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json(req.file);

  // you can make an API call here with the file 
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});