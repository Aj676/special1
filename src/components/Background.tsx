import { useMemo } from "react";

type Star = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

function useStars(count: number, seed = 1): Star[] {
  return useMemo(() => {
    // deterministic pseudo-random so layout is stable between renders
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => ({
      top: `${rand() * 100}%`,
      left: `${rand() * 100}%`,
      size: 1 + rand() * 2.4,
      delay: `${rand() * 5}s`,
      duration: `${2.5 + rand() * 4}s`,
      opacity: 0.3 + rand() * 0.7,
    }));
  }, [count, seed]);
}

export default function Background() {
  const stars = useStars(90, 7);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,#3d1f6e_0%,#1a0b2e_45%,#0f0720_100%)]" />

      {/* drifting glow orbs */}
      <div
        className="absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,111,174,0.55), transparent 65%)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[40rem] w-[40rem] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(183,148,255,0.55), transparent 65%)",
          animation: "drift 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(125,239,255,0.45), transparent 65%)",
          animation: "drift 26s ease-in-out infinite",
        }}
      />

      {/* twinkling stars */}
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(8,4,18,0.7)_100%)]" />
    </div>
  );
}
