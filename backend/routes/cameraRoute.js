import express from 'express'
import {
  createCamera,
  deleteCamera,
  getActiveCameras,
  getCameraById,
  updateCamera,
} from '../controllers/cameraController.js'
const router = express.Router()

router.route('/').get(getActiveCameras).post(createCamera)
router.route('/:id').get(getCameraById).put(updateCamera).delete(deleteCamera)

export default router
