import multer from 'multer'
import express from 'express'
import { inputValidation, fileInputValidation } from 'src/middlewares'
import imageController from 'src/controllers/image-controller'

import validations from './validations'

const upload = multer({ dest: 'public/tmp/uploads/' })

const router = express.Router()

router.route('/')
  .post(
    upload.single('photo'),
    inputValidation(validations.store),
    fileInputValidation('photo'),
    imageController.store
  )
  .get(
    imageController.collections
  )

export default router
