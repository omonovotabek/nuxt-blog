const {Router} = require("express")
const adminRouter = require("./adminRouter")
const postRouter = require("./postRouter")
const commentRouter = require("./commentRouter")
const router = Router()

router.use("/auth/admin", adminRouter)
router.use("/comment", commentRouter)
router.use("/post", postRouter)

module.exports = router
