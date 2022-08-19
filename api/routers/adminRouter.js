const {Router} = require('express')
const {signIn, signUp} = require('../controllers/adminController')
const {authGuard} = require('../middlewares/authGuard')
const router = Router()

router.post('/signUp', authGuard, signUp)
router.post('/signIn', signIn)

module.exports = router