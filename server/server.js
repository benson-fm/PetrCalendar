const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const upload = multer({ dest: 'uploads/' });


app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const apiUrl = "https://api.ocr.space/parse/image";
        const response = await axios.post(apiUrl, {
            file: fileContent}, {
                headers: {
                    isOverlayRequired: true,
                    apikey: "K81624200688957",
                    language: "eng",
                }
            });
        fs.unlinkSync(filePath);
        res.json({ message: 'File uploaded and processed', data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing file' });
    
    }
});

app.listen(5000, () => { console.log("Server is running on port 5000") });

