import express from 'express'
import {
  createCamera,
  deleteCamera,
  getActiveCameras,
  updateCamera,
} from '../controllers/cameraController.js'
const router = express.Router()

router.route('/').get(getActiveCameras).post(createCamera)
router.route('/:id').put(updateCamera).delete(deleteCamera)

export default router
