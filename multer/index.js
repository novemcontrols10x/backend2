const { configDotenv } = require('dotenv');
const express = require('express')
const multer = require('multer');
const upload = require('./multer');
const cloudinary = require('./cloudinary')
const fs = require('fs')
configDotenv()

const app = express();



// console.log(process.env)


app.post('/upload', upload.single("image"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await cloudinary.uploader
            .upload(filePath, {
                resource_type: "auto"
            });
        console.log('code worked', result)

        fs.unlinkSync(filePath)

        res.status(200).json({ message: 'file uploaded to cloudinary', url:result.url }).send('uploaded')
    } catch (error) {
        res.status(500).json({ message: 'went error while uploading to cloud' })
        console.log("went error while uploading to cloud")
    }
})


app.get('/', (req, res) => {
    res.send('server is running')
})



app.listen(3000, () => {
    console.log('go to port 3000')
})

