import status from 'http-status'
import r from '../lib/resjson'

export default () => {
  return (req, res, next) => {
    let response
    if (!req.headers.api_key) {
      response = r('missing api_key')
      return res.status(status.BAD_REQUEST).json(response)
    }

    if (req.headers.api_key !== process.env.TOKEN_KEY) {
      response = r('api_key not available')
      return res.status(status.BAD_REQUEST).json(response)
    }

    return next()
  }
}
