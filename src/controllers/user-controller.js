// import status from 'http-status'
// import { User } from '../models'
// import bcrypt from '../lib/bcrypt'
// import auth from '../lib/auth'
// import r from '../lib/resjson'

// const create = async (req, res) => {
//   const { body } = req
//   let response

//   const findUserName = await User.findOne({
//     username: body.username
//   })

//   const findUserEmail = await User.findOne({
//     email: body.email
//   })

//   if (findUserName === null && findUserEmail === null) {
//     const encryptPassword = await bcrypt.en(body.password)

//     const user = await User.create({
//       username: body.username,
//       email: body.email,
//       password: encryptPassword,
//       authority: body.authority,
//       approved: true
//     })
//     response = r('account has been created', req.headers.token, user)
//     res.status(status.CREATED).json(response)
//   } else {
//     response = r('account is available', req.headers.token)
//     res.status(status.BAD_REQUEST).json(response)
//   }
// }

// const login = async (req, res) => {
//   const { body } = req
//   let response

//   const user = await User.findOne({
//     username: body.username
//   })

//   if (user === null) {
//     response = r('user not found', req.headers.token)
//     res.status(status.BAD_REQUEST).json(response)
//   } else {
//     const matchingPassword = await bcrypt.de(body.password, user.password)

//     if (matchingPassword) {
//       const token = await auth.create({
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         authority: user.authority,
//         approved: user.approved,
//         active: user.active
//       })

//       response = r('logged', req.headers.token, {
//         token: token
//       })
//       res.status(status.OK).json(response)
//     } else {
//       response = r('password do not match', req.headers.token)
//       res.status(status.BAD_REQUEST).json(response)
//     }
//   }
// }

// export default {
//   create,
//   login
// }
