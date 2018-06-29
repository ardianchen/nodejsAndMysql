import express from 'express'
import { inputValidation } from 'src/middlewares'
import userController from 'src/controllers/user-controller'

import validations from './validations'

const router = express.Router()

router.route('/register')
  .post(
    inputValidation(validations.create),
    userController.create
  )

router.route('/login')
  .post(
    inputValidation(validations.login),
    userController.login
  )

export default router
