const Admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')

signUp = async (req, res, next) => {
 
  try {
    const { firstName, lastName, email, password } = req.body     
    const candidate = await Admin.findOne({email})

    if(candidate)
     return res.status(406).json({message: 'Логин уже занить'})     
     
    const admin = new Admin ({
        firstName, lastName, email, password
    })
    
    admin.firstName = admin.firstNameCapitalise()
    admin.lastName = admin.lastNameCapitalise()
    if(`${password}`.length >= 6)
    admin.password = await bcrypt.hash(password, 10)

    await admin.save()
    res.status(201).json({message:"Создать новая ползователь"})
  } catch (error) {
    next(error)
  }
}

signIn = async (req, res, next) => {
    try {
      const {email, password} = req.body
      const admin = await Admin.findOne({email})     
      if(!admin)
        return res.status(404).json({message: 'Логин не найден'})    

      const isPasswordCorrect = await bcrypt.compare(password, admin.password)
      if(!isPasswordCorrect)
        return res.status(400).json({message: 'Парол не правилний'})
        
      const token = admin.generateAuthToken()
      res.status(200).json({
        token,
        message:"Добро пажаловать админиский часть"
      })
    } catch (error) {
      next(error)
    }
}

module.exports = {
    signIn, signUp
}