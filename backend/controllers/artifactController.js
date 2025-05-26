import Artifact from '../models/Artifact.js';

export const createArtifact = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const artifact = await Artifact.create({
      title,
      description,
      userId: req.user.id,
      traceLogs: [{ action: 'created', timestamp: new Date() }],
    });
    res.status(201).json(artifact);
  } catch (err) {
    console.error('Artifact creation error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find({ userId: req.user.id, deleted: false });
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching artifacts' });
  }
};

export const updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact || artifact.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    artifact.title = req.body.title || artifact.title;
    artifact.description = req.body.description || artifact.description;
    artifact.updatedAt = new Date();
    artifact.traceLogs.push({ action: 'updated', timestamp: new Date() });

    const updated = await artifact.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating artifact' });
  }
};

export const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact || artifact.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    artifact.deleted = true;
    artifact.traceLogs.push({ action: 'soft-deleted', timestamp: new Date() });

    await artifact.save();
    res.status(200).json({ message: 'Artifact archived' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting artifact' });
  }
};
