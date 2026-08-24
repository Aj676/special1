import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { DHRUTI } from "../lib/content";
import { celebrateBurst } from "../lib/confetti";
import { playSparkle } from "../lib/sound";
import { Eyebrow, GlowButton } from "../components/ui";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 16,
      delay: i * 0.08,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Welcome({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => celebrateBurst(), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
      {/* floating balloons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["🎈", "🎈", "🎈", "🎈", "🎈"].map((b, i) => (
          <span
            key={i}
            className="absolute text-5xl opacity-70 sm:text-6xl"
            style={{
              left: `${8 + i * 21}%`,
              top: `${10 + (i % 3) * 26}%`,
              animation: `floaty-slow ${5 + i}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>A little surprise · just for you</Eyebrow>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-script mt-6 text-4xl text-pink-100/90 text-glow-soft sm:text-5xl"
        >
          Happy Birthday
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display mt-1 flex text-[19vw] font-bold leading-[0.9] sm:text-[12rem]"
          style={{ perspective: 800 }}
        >
          {DHRUTI.name.split("").map((ch, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letter}
              className="gradient-text inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-200/90"
        >
          <span className="text-lg">✦</span>
          {DHRUTI.date}
          <span className="text-lg">✦</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-base leading-relaxed text-pink-100/80 sm:text-lg"
        >
          I built something a little different for your special day — a tiny
          world of confetti, candles and a surprise or two. Take your time,
          explore every page, and let yourself be celebrated. 💖
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <GlowButton
            pulse
            onClick={() => {
              playSparkle();
              onNext();
            }}
          >
            Open your surprise 🎁
          </GlowButton>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-xs uppercase tracking-[0.25em] text-pink-200/50"
        >
          Best with sound on 🔊 · 5 magical moments await
        </motion.p>
      </motion.div>
    </section>
  );
}
