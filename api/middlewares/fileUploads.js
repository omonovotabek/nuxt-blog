const multer = require('multer')
const moment = require('moment')
const path = require('path')

const DIR = path.resolve(__dirname, '../../', 'client/static')
module.exports.imgUpload = multer({
    storage: multer.diskStorage({
       destination(req, file, cb){
           cb(null, DIR)
       },
       filename(req, file, cb) {
           const date = moment().format("DDMMYYYY-HHmmss SSS")
           cb(null, `${date}-${file.originalname}`)
       }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            cb(null, true)
        }else{
            cb(null, false)
        } 
    },
    limits: {
       fileSize: 1024*1024*5
    }
}).single('image')