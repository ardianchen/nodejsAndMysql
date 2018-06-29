import status from 'http-status'
import Storage from '../lib/storage'
import { Image } from '../models'
import r from '../lib/resjson'

const store = async (req, res) => {
  const { file, body } = req
  let response
  const photoFile = await Storage.move(file, req.headers.username)

  const image = await Image.create({
    filename: photoFile.original_filename,
    url: photoFile.original_file_url,
    source: body.source,
    urlSource: body.urlSource,
    userId: req.headers.userId
  })

  const resImage = await image.populate({ path: 'userId', select: ['username'] }).execPopulate()
  response = r('image uploaded', req.headers.token, resImage)
  res.status(status.CREATED).json(response)
}

const collections = async (req, res) => {
  let response

  const image = await Image.find({
    userId: req.headers.userId
  })
    .sort({'createdAt': -1})
    .limit(15)

  response = r('found', req.headers.token, image)
  res.status(status.OK).json(response)
}

export default {
  store,
  collections
}
