import mongoose from 'mongoose'

const cameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    ip: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const CameraModel =
  mongoose.models.cameras || mongoose.model('cameras', cameraSchema)

export default CameraModel
