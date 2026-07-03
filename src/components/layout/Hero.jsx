import { DEPARTMENT_NAME } from "../../constants/copy";

export default function Hero({ compact = false, title, subtitle }) {
  return (
    <header className={`hero ${compact ? "compact" : ""}`}>
      <div className="badge">{DEPARTMENT_NAME}</div>
      <h1>{title}</h1>
      {subtitle && <p className="hero-sub">{subtitle}</p>}
    </header>
  );
}
