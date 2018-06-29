import jwt from 'jsonwebtoken'
const key = process.env.TOKEN_KEY.toString()
const exToken = process.env.EX_TOKEN.toString()

const verify = async (token) => new Promise((resolve, reject) => {
  jwt.verify(token, key, (err, decode) => {
    if (err) {
      reject(new Error(err.message))
    } else {
      const userData = {
        _id: decode._id,
        username: decode.username,
        email: decode.email,
        authority: decode.authority,
        approved: decode.approved,
        active: decode.active
      }
      resolve(userData)
    }
  })
})

const create = async (doc) => new Promise((resolve, reject) => {
  jwt.sign(doc, key, { expiresIn: exToken }, (err, token) => {
    if (err) {
      reject(new Error(err.message))
    } else {
      resolve(token)
    }
  })
})

export default {
  verify,
  create
}
