import DetectionModel from '../models/detectionModel.js';
import asyncHandler from 'express-async-handler';
import { io } from 'socket.io-client';

// @desc   Get all detections
// @route  GET /api/detections
// @access Public

const getDetections = asyncHandler(async (req, res) => {
  const detections = await DetectionModel.find({}).populate('cameraId');

  res.json(detections);
});

// @desc  Create a detection
// @route POST /api/detections
// @access Public

const createDetection = asyncHandler(async (req, res) => {
  const { cameraId, image, numberOfElephant, additionalInfo } = req.body;

  const detection = new DetectionModel({
    cameraId,
    image,
    numberOfElephant,
    additionalInfo,
  });

  // save the data and populate the cameraId with the camera details
  const createdDetection = await detection.save();
  const populatedDetection = await DetectionModel.findById(createdDetection._id).populate('cameraId');

  // const createdDetection = await detection.save();
  // populate cameraId with the camera details

  const socket = io(process.env.SOCKET_URL);
  socket.emit('send-message', populatedDetection);

  res.status(201).json({
    message: 'Detection created successfully',
    detection: populatedDetection,
  });
});

// @desc  Get a detection by ID
// @route GET /api/detections/:id
// @access Public

const getDetectionById = asyncHandler(async (req, res) => {
  const detection = await DetectionModel.findById(req.params.id);

  if (detection) {
    res.json(detection);
  } else {
    res.status(404);
    throw new Error('Detection not found');
  }
});

// @desc Update a detection
// @route PUT /api/detections/:id
// @access Public

const updateDetection = asyncHandler(async (req, res) => {
  const { additionalInfo } = req.body;

  const detection = await DetectionModel.findById(req.params.id);

  if (detection) {
    detection.additionalInfo = additionalInfo || detection.additionalInfo;

    const updatedDetection = await detection.save();
    res.json({
      message: 'Detection updated successfully',
      detection: updatedDetection,
    });
  } else {
    res.status(404);
    throw new Error('Detection not found');
  }
});

// @desc Delete a detection
// @route DELETE /api/detections/:id
// @access Public

const deleteDetection = asyncHandler(async (req, res) => {
  const detection = await DetectionModel.findById(req.params.id);

  if (detection) {
    await detection.deleteOne();
    res.json({ message: 'Detection removed' });
  } else {
    res.status(404);
    throw new Error('Detection not found');
  }
});

export { getDetections, createDetection, getDetectionById, updateDetection, deleteDetection };
