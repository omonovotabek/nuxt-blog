import {v4} from "uuid"
import {storage} from "."
import {ref, getStorage, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"

class FileService{
 async saveFile(file){
   const typeFile = file.name.split(".").pop();
   const uniqFileName = v4() + "." + typeFile;
   const fileRef = ref(storage, `images/${uniqFileName}`)
   await uploadBytes(fileRef, file)
   return await getDownloadURL(fileRef)
 }

 deleteFile(imageUrl){
  const storage = getStorage();
  const desertRef = ref(storage, imageUrl);
  
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
 }

}

export default new FileService()