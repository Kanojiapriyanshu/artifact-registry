export default function ArtifactCard({ artifact, onDelete }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow flex justify-between items-start">
      <div>
        <h2 className="font-bold text-lg">{artifact.title}</h2>
        <p className="text-sm text-gray-600">{artifact.description}</p>
      </div>
      <button
        onClick={() => onDelete(artifact._id)}
        className="text-red-600 hover:underline text-sm ml-4"
      >
        Delete
      </button>
    </div>
  );
}
