const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "content")
    },
    filename: (req, file, cb)=> {
        console.log('inside storage');
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 10000 * 100},
    fileFilter: (req, file, cb)=> {
        console.log('inside upload')
        const fileTypes = /jpg|png|mp4|gif/;
        console.log('file', file.mimetype, file.originalname);
        return cb(null, true);
    }
}).single('image');

module.exports = upload