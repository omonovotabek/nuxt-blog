module.exports = function (error, req, res, next) {
    if(error.errors){
      res.status(400).json(error.message);
    }else{
      res.status(500).json({message:'Server error 500'}); 
      console.log(error);
     }
  }