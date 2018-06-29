import status from 'http-status'
import auth from '../lib/auth'
import r from '../lib/resjson'

export default () => {
  return (req, res, next) => {
    let response
    if (!req.headers.token) {
      response = r('missing token')
      return res.status(status.BAD_REQUEST).json(response)
    } else {
      auth.verify(req.headers.token)
        .then((resVerify) => {
          if (resVerify) {
            auth.create({
              _id: resVerify._id,
              username: resVerify.username,
              email: resVerify.email,
              authority: resVerify.authority,
              approved: resVerify.approved,
              active: resVerify.active
            })
              .then((response) => {
                req.headers.userId = resVerify._id
                req.headers.username = resVerify.username
                req.headers.token = response
                return next()
              })
          }
        })
        .catch((err) => {
          if (err) {
            response = r(err.message)
            return res.status(status.BAD_REQUEST).json(response)
          }
        })
    }
  }
}
