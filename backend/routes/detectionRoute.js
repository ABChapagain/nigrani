import express from 'express'
import { getDetections } from '../controllers/detectionController.js'

const router = express.Router()

router.route('/').get(getDetections)

export default router
