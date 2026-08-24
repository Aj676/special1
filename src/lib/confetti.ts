import confetti from "canvas-confetti";

/** The brand colour palette used across the whole site. */
const COLORS = ["#ff6fae", "#ffd27d", "#b794ff", "#7defff", "#ffffff"];

/** A gentle burst from the bottom-left / bottom-right corners. */
export function celebrateBurst() {
  const end = Date.now() + 900;
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      startVelocity: 45,
      origin: { x: 0, y: 0.95 },
      colors: COLORS,
      scalar: 1.05,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      startVelocity: 45,
      origin: { x: 1, y: 0.95 },
      colors: COLORS,
      scalar: 1.05,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/** A single big firework-style explosion at the centre of the screen. */
export function firework(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 90,
    spread: 360,
    startVelocity: 38,
    origin: { x, y },
    colors: COLORS,
    ticks: 220,
    scalar: 1.1,
  });
}

/** Full-screen celebratory finale — hearts + sparkles + fireworks. */
export function grandFinale() {
  const duration = 4200;
  const end = Date.now() + duration;
  const defaults = { startVelocity: 32, spread: 360, ticks: 70, zIndex: 80 };

  (function frame() {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) return;

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() - 0.2 },
      colors: COLORS,
    });

    // floating hearts
    confetti({
      particleCount: 6,
      origin: { x: Math.random(), y: 1 },
      colors: ["#ff6fae", "#ff9ec7", "#ffd1e6"],
      shapes: ["circle"],
      scalar: 2.4,
      gravity: 0.4,
      drift: 0.6,
      startVelocity: 0,
      ticks: 300,
    });

    if (timeLeft > 0) requestAnimationFrame(frame);
  })();

  // a couple of star bursts for extra magic
  firework(0.5, 0.45);
  setTimeout(() => firework(0.3, 0.5), 350);
  setTimeout(() => firework(0.7, 0.4), 700);
}

/** A soft sparkle puff — used for small moments. */
export function sparklePuff(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 26,
    spread: 70,
    startVelocity: 22,
    origin: { x, y },
    colors: ["#ffd27d", "#ffffff", "#b794ff"],
    scalar: 0.9,
    ticks: 120,
    gravity: 0.2,
  });
}
