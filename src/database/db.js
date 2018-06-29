// import mongoose from 'mongoose'
import mysql from 'mysql'

class Database {
  constructor (options = {}) {
    const {url, user, password, database} = options

    this.db = mysql.createConnection({
      host: url,
      user: user,
      password: password,
      database: database
    })
  }
  query (sql, args) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, args, (err, rows) => {
        if (err) return reject(err.message)

        resolve(rows)
      })
    })
  }
  connect () {
    return new Promise((resolve, reject) => {
      this.db.connect((err, res) => {
        if (err) return reject(err.message)
        resolve('Connected!')
      })
    })
  }
  close () {
    return new Promise((resolve, reject) => {
      this.db.end(err => {
        if (err) return reject(err.message)

        resolve()
      })
    })
  }
}

const db = () => {
  return new Database({
    url: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASENAME
  })
}

export default db()
