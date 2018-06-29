import express from 'express'
import test from './test'
// import user from './user'
// import article from './world/article'
// import category from './world/category'

const router = express.Router()

router.use('/test', test)
// router.use('/world/articles', article)
// router.use('/world/categories', category)

export default router
