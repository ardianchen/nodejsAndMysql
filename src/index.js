import app from './app.js'
import { Database } from './database'

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV
Database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`[App] Listening on http://localhost:${PORT} in ${ENV} environment`)
  })
})
