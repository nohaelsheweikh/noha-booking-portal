import { PACKAGE_STEP_DESC } from "../../constants/copy";
import { PACKAGES, SERIOUSNESS } from "../../constants/booking";

export default function PackageStep({ pkg, level, onPackageChange, onLevelChange }) {
  return (
    <div className="step-content fade-in">
      <h2>What kind of appointment is this?</h2>
      <p className="step-desc">{PACKAGE_STEP_DESC}</p>

      <div className="package-grid">
        {PACKAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`package-card ${pkg === p.label ? "selected" : ""}`}
            onClick={() => onPackageChange(p.label)}
          >
            <span className="pkg-tag">{p.tag}</span>
            <span className="pkg-emoji">{p.emoji}</span>
            <span className="pkg-label">{p.label}</span>
          </button>
        ))}
      </div>

      <p className="field-label">How seriously should Noha treat this?</p>
      <div className="seriousness-row">
        {SERIOUSNESS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`serious-pill ${level === s.label ? "selected" : ""}`}
            onClick={() => onLevelChange(s.label)}
          >
            <span>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
