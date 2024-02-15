import asyncHandler from 'express-async-handler';
import CameraModel from '../models/cameraModel.js';

// @desc    Get all cameras
// @route   GET /api/cameras
// @access  Public

const getActiveCameras = asyncHandler(async (req, res) => {
  const cameras = await CameraModel.find({}).sort({ createdAt: -1 });

  res.json(cameras);
});

// @desc    Create a camera
// @route   POST /api/cameras
// @access  Private/Admin

const createCamera = asyncHandler(async (req, res) => {
  const { name, coordinates, ip, location, status } = req.body;

  const camera = new CameraModel({
    name,
    coordinates,
    ip,
    location,
    status,
  });

  const createdCamera = await camera.save();
  res.status(201).json({
    message: 'Camera created successfully',
    createdCamera,
  });
});

// @desc   Get a camera by ID
// @route  GET /api/cameras/:id
// @access Public

const getCameraById = asyncHandler(async (req, res) => {
  const camera = await CameraModel.findById(req.params.id);

  if (camera) {
    res.json(camera);
  } else {
    res.status(404);
    throw new Error('Camera not found');
  }
});

// @desc    Update a camera
// @route   PUT /api/cameras/:id
// @access  Private/Admin

const updateCamera = asyncHandler(async (req, res) => {
  const { name, coordinates, ip, location, status } = req.body;

  const camera = await CameraModel.findById(req.params.id);

  if (camera) {
    camera.name = name || camera.name;
    camera.coordinates = coordinates || camera.coordinates;
    camera.ip = ip || camera.ip;
    camera.location = location || camera.location;
    camera.status = status;

    const updatedCamera = await camera.save();
    res.json({
      message: 'Camera updated successfully',
      updatedCamera,
    });
  } else {
    res.status(404);
    throw new Error('Camera not found');
  }
});

// @desc    Delete a camera
// @route   DELETE /api/cameras/:id
// @access  Private/Admin

const deleteCamera = asyncHandler(async (req, res) => {
  const camera = await CameraModel.findById(req.params.id);

  if (camera) {
    await camera.deleteOne();
    res.json({ message: 'Camera removed successfully' });
  } else {
    res.status(404);
    throw new Error('Camera not found');
  }
});

export { getActiveCameras, createCamera, updateCamera, deleteCamera, getCameraById };
