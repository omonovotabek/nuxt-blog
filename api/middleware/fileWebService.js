const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const BUCKET = "nuxt-blog-c51f1.appspot.com"
const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-key.json");

if (!admin.apps.length) {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
  });
}
   
const bucket = admin.storage().bucket()

const uploadImage = (req, res, next) => {
  if(!req.files.image) return next()

  const imagem = req.files.image 
  const nomeArquivo  = Date.now() + imagem.name

  const file = bucket.file(nomeArquivo)
  
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype
    }
  })

  stream.on("error", (e) => {
    console.log(e);
  })

  stream.on("finish", async () => {
    await file.makePublic()

    req.files.image.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}` 
    next()
  })

 stream.end(imagem.data)
 req.uniqName = nomeArquivo
}

const deleteImageFromFirebase = async (req, res, next) => {
  // console.log(req.query)
  await admin.storage().bucket().file(req.query.imageName).delete();
  next()
}
 
module.exports = {uploadImage, deleteImageFromFirebase}

