const jwt = require('jsonwebtoken')


module.exports.authGuard = async (req, res, next) => {
    const token = req.header('x-auth-token')
     if(!token)
       return res.status(401).json({message: 'Token bolmaganligi sababli murojat rad etildi'})
    
    try {
        const decoded = jwt.verify(token, process.env.jwtSecretKey)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(400).json({message: "Yaroqsiz token"})
    }
}      