import { useMemo, type CSSProperties } from "react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  emoji: string;
  drift: string;
};

const EMOJIS = ["💖", "🌸", "✨", "💫", "⭐", "💘"];

/**
 * Ambient, slowly rising particles (hearts, sparkles, petals).
 * Rendered as a fixed overlay so it works above any page content.
 */
export default function FloatingHearts({
  count = 16,
}: {
  count?: number;
}) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 20,
      delay: `${Math.random() * 8}s`,
      duration: `${9 + Math.random() * 10}s`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      drift: `${(Math.random() - 0.5) * 120}px`,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] select-none will-change-transform"
          style={
            {
              left: p.left,
              fontSize: `${p.size}px`,
              "--drift": p.drift,
              animation: `rise-fade ${p.duration} linear ${p.delay} infinite`,
            } as CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
