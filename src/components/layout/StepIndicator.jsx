import { WIZARD_STEPS } from "../../constants/booking";

export default function StepIndicator({ currentStep }) {
  return (
    <div className="steps">
      {WIZARD_STEPS.map((label, i) => (
        <div
          key={label}
          className={`step-item ${i <= currentStep ? "active" : ""} ${i === currentStep ? "current" : ""}`}
        >
          <div className="step-dot">{i < currentStep ? "✓" : i + 1}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
