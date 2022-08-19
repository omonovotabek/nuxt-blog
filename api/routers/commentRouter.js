const {Router} = require('express')
const {create} = require('../controllers/commentController')

const router = Router()

router.post('/', create)

module.exports = router