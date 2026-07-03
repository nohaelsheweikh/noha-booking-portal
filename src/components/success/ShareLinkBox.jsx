export default function ShareLinkBox({ copied, onCopy }) {
  return (
    <div className="share-box">
      <div className="share-text">
        <strong>Send Noha the confirmation link</strong>
        <p>She's hard to reach — this link lets her add it to her calendar in one tap.</p>
      </div>
      <button type="button" className="btn-share" onClick={onCopy}>
        {copied ? "✓ Copied!" : "Copy link for Noha"}
      </button>
    </div>
  );
}
