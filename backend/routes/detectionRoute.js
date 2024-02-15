import express from 'express'
import {
  createDetection,
  deleteDetection,
  getDetectionById,
  getDetections,
  updateDetection,
} from '../controllers/detectionController.js'

const router = express.Router()

router.route('/').get(getDetections).post(createDetection)
router
  .route('/:id')
  .get(getDetectionById)
  .put(updateDetection)
  .delete(deleteDetection)

export default router
