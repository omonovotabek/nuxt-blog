const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

class FileService {
  rootPath() {
    return path.resolve(__dirname, "../../", "static");
  }

  createFile(dirName, file) {
    const filePath = this.rootPath() + "\\" + dirName;
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      const typeFile = file.name.split(".").pop();
      const uniqFileName = uuid.v4() + "." + typeFile;
      file.mv(filePath + "\\" + uniqFileName);
      return { uniqFileName };
    } else {
      const typeError = "File types allowed .jpeg, .jpg and .png!";
      return { typeError };
    }
  }

  deleteFile(dirName, uniqFileName) {
    const filePath = this.rootPath() + "\\" + dirName + uniqFileName;
    fs.unlinkSync(filePath);
  }
}

module.exports = new FileService();
