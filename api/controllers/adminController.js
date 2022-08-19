const Admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')

signUp = async (req, res) => {
 
  try {
    const { firstName, lastName, email, password } = req.body     
    let admin = await Admin.findOne({email})

    if(admin)
     return res.json({messageUsedEmail: 'Логин уже занить'})     
     
    admin = new Admin ({
        firstName, lastName, email, password
    })
    
    admin.firstName = admin.firstNameCapitalise()
    admin.lastName = admin.lastNameCapitalise()
    admin.password = await bcrypt.hash(password, 10)
    await admin.save()
    res.status(201).json({messageCreateEmail:"Создать новая ползователь"})
  } catch (e) {
    res.status(500).json(e)
  }
}

signIn = async (req, res) => {
    try {
      const {email, password} = req.body
      const admin = await Admin.findOne({email})     
      if(!admin)
        return res.json({messageCheckEmail: 'Логин не найден'})    

      const isPasswordValid = await bcrypt.compare(password, admin.password)
      if(!isPasswordValid)
        return res.json({messageCheckPassword: 'Парол не правилний'})
        
      const token = admin.generateAuthToken()
      res.header('x-auth-token', token)
      .json({
        token,
        messageSuccess:"Добро пажаловать админиский часть"
      })
    } catch (e) {
      res.status(400).json(e.message)
    }
}

module.exports = {
    signIn, signUp
}