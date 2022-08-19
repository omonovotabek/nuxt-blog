const {Schema, model} = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const jwtSecretKey = config.get('jwtSecretKey')

const adminSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
})
adminSchema.methods.firstNameCapitalise = function () {
    let firstName = this.firstName.toLowerCase()
    textOneLetter = firstName.slice(0, 1)
    newLetter = textOneLetter.toUpperCase()
    firstName = firstName.replace(textOneLetter, newLetter)
    return firstName
}

adminSchema.methods.lastNameCapitalise = function () {
    let lastName = this.lastName.toLowerCase()
    textOneLetter = lastName.slice(0, 1)
    newLetter = textOneLetter.toUpperCase()
    lastName = lastName.replace(textOneLetter, newLetter)
    return lastName
}

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {_id: this._id},
        jwtSecretKey,
        {expiresIn: 60*60}
    )
    return token
}

module.exports = model('Admin', adminSchema)



