const FLOATERS = [
  { emoji: "📅", top: "8%", left: "6%", size: "2.4rem", delay: "0s", duration: "18s", anim: "drift-a" },
  { emoji: "⏰", top: "15%", left: "82%", size: "2.8rem", delay: "2s", duration: "22s", anim: "drift-b" },
  { emoji: "🍝", top: "72%", left: "8%", size: "2.2rem", delay: "4s", duration: "20s", anim: "drift-c" },
  { emoji: "🗓️", top: "65%", left: "88%", size: "2.6rem", delay: "1s", duration: "24s", anim: "drift-a" },
  { emoji: "🎉", top: "38%", left: "4%", size: "2rem", delay: "6s", duration: "19s", anim: "drift-b" },
  { emoji: "📋", top: "45%", left: "92%", size: "2.3rem", delay: "3s", duration: "21s", anim: "drift-c" },
  { emoji: "🍰", top: "85%", left: "75%", size: "2.5rem", delay: "5s", duration: "23s", anim: "drift-a" },
  { emoji: "💼", top: "28%", left: "78%", size: "2rem", delay: "7s", duration: "17s", anim: "drift-b" },
  { emoji: "🗣️", top: "55%", left: "12%", size: "1.9rem", delay: "8s", duration: "25s", anim: "drift-c" },
  { emoji: "🔒", top: "20%", left: "45%", size: "1.8rem", delay: "9s", duration: "16s", anim: "drift-a" },
];

const LABELS = [
  { text: "BUSY", top: "12%", left: "55%", delay: "0s", rotate: "-8deg" },
  { text: "NO SLOTS", top: "78%", left: "35%", delay: "3s", rotate: "6deg" },
  { text: "TENTATIVE", top: "50%", left: "70%", delay: "6s", rotate: "-12deg" },
  { text: "RESCHEDULE?", top: "32%", left: "18%", delay: "9s", rotate: "10deg" },
  { text: "BLOCKED", top: "88%", left: "55%", delay: "12s", rotate: "-5deg" },
];

export default function FunnyBackground() {
  return (
    <div className="funny-bg" aria-hidden="true">
      <div className="blobs">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className={`floater ${f.anim}`}
          style={{
            top: f.top,
            left: f.left,
            fontSize: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {LABELS.map((l, i) => (
        <span
          key={i}
          className="float-label"
          style={{
            top: l.top,
            left: l.left,
            animationDelay: l.delay,
            "--label-rotate": l.rotate,
          }}
        >
          {l.text}
        </span>
      ))}

      <div className="calendar-rain">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rain-page"
            style={{
              left: `${12 + i * 15}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${14 + i * 2}s`,
            }}
          >
            📄
          </div>
        ))}
      </div>
    </div>
  );
}
