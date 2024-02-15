import mongoose from 'mongoose'

const detectionSchema = new mongoose.Schema(
  {
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'cameras',
    },
    image: {
      type: String,
      required: true,
    },
    numberOfElephant: {
      type: Number,
      required: true,
    },
    additionalInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const DetectionModel =
  mongoose.models.detections || mongoose.model('detectations', detectionSchema)

export default DetectionModel
