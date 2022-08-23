const {Router} = require('express')
const {createComment, deleteComment} = require('../controllers/commentController')
const {authGuard} = require('../middleware/authGuard')

const router = Router()

router.post('', authGuard, createComment)
router.delete('/:id', authGuard, deleteComment)

module.exports = router