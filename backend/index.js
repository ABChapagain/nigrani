import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

// database connection
import connectDB from './config/connectDB.js'

// routes
import cameraRoutes from './routes/cameraRoute.js'
import detectionRoutes from './routes/detectionRoute.js'

const app = express()

// config dotenv
dotenv.config()

// databnase connection
connectDB()

// cors
app.use(cors())

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/cameras', cameraRoutes)
app.use('/api/detections', detectionRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
