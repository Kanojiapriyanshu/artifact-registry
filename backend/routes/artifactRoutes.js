import express from 'express';
import {
  createArtifact,
  getArtifacts,
  updateArtifact,
  deleteArtifact,
} from '../controllers/artifactController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Connect protected routes
router.route('/')
  .get(protect, getArtifacts)
  .post(protect, createArtifact);

router.route('/:id')
  .put(protect, updateArtifact)
  .delete(protect, deleteArtifact);

export default router;
