export default function ArtifactCard({ artifact, onDelete }) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow flex justify-between">
        <div>
          <h2 className="font-bold">{artifact.title}</h2>
          <p className="text-sm text-gray-600">{artifact.description}</p>
        </div>
        <button onClick={() => onDelete(artifact._id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    );
  }
  