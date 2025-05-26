import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  traceLogs: [
    {
      action: String,
      timestamp: Date
    }
  ]
});

export default mongoose.model('Artifact', artifactSchema);
