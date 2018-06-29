import express from 'express'
import testController from 'src/controllers/test-controller'

const router = express.Router()

router.route('/')
  .get(
    testController.createTable
  )

export default router
