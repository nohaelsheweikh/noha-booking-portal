export default function LoadingOverlay({ message }) {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}
