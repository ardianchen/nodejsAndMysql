import cors from 'cors'
import express from 'express'
import { resolve } from 'path'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

import routes from './routes'
import routesIn from './routes/routes-in'
import { NotFoundError } from './errors/http'
import { errorToResponse, checkInKey, checkInToken } from './middlewares'

const app = express()

app.use('/public', express.static(resolve(__dirname, '../public')))
app.use(cors({
  origin: [
    'http://localhost:3000'
  ],
  optionsSuccessStatus: 200
}))
app.use(methodOverride())
app.use(bodyParser.json({ limit: '250kb' }))
app.use(bodyParser.urlencoded({ extended: true }))

const secureRoutes = express.Router()
const loginRoutes = express.Router()

app.use('/api', secureRoutes)

secureRoutes.use(checkInKey())

secureRoutes.use(routes)

secureRoutes.use(loginRoutes)

loginRoutes.use(checkInToken())

loginRoutes.use(routesIn)

app.use((req, res, next) => {
  const err = new NotFoundError('Endpoint was not found')
  return next(err)
})
app.use(errorToResponse())

export default app
