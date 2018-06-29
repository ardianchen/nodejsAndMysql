import bcrypt from 'bcrypt'

const config = {
  saltRounds: 10
}

const en = async (data) => new Promise((resolve, reject) => {
  bcrypt.genSalt(config.saltRounds, (err, salt) => {
    if (err) {
      reject(new Error(err.message))
    }
    bcrypt.hash(data, salt, (err, hash) => {
      if (err) {
        reject(new Error(err.message))
      }
      resolve(hash)
    })
  })
})

const de = async (data, compare) => new Promise((resolve, reject) => {
  bcrypt.compare(data, compare, (err, comp) => {
    if (err) {
      reject(new Error('failed compare data'))
    }

    if (comp === true) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
})

export default {
  en,
  de
}
