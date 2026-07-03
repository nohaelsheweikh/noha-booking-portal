import FunnyBackground from "../FunnyBackground";

export default function PageLayout({ children }) {
  return (
    <div className="page">
      <FunnyBackground />
      <main className="shell">{children}</main>
    </div>
  );
}
