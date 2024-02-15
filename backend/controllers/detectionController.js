import DetectionModel from '../models/detectionModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Get all detections
// @route  GET /api/detections
// @access Public

const getDetections = asyncHandler(async (req, res) => {
  const detections = await DetectionModel.find({}).populate('cameraId')

  res.json(detections)
})

export { getDetections }
