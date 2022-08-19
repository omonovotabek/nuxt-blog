const {Router} = require('express')
const {authGuard} = require('../middlewares/authGuard')
const {imgUpload} = require('../middlewares/fileUploads')
const postController = require('../controllers/postController')

const router = Router()

router.post('/admin', authGuard, imgUpload, postController.create)
router.get('/admin', authGuard, postController.getAll)
router.get('/admin/:id', authGuard, postController.getById)
router.put('/admin/:id', authGuard, postController.update)
router.delete('/admin/:id', authGuard, postController.remove)

router.get('/', postController.getAll)
router.get('/:id', postController.getById)
router.put('/add/view/:id', postController.addView)

module.exports = router 