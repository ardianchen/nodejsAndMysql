import { Database } from '../database'

export default () => new Promise(async (resolve, reject) => {
  const sql = 'CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))'
  var kueri = await Database.query(sql)
  resolve(kueri)
})
