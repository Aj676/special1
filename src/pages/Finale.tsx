import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DHRUTI } from "../lib/content";
import { firework, grandFinale } from "../lib/confetti";
import { playFinale } from "../lib/sound";
import { Eyebrow, GlowButton, GhostButton } from "../components/ui";

export default function Finale({
  onRestart,
}: {
  onRestart: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const press = () => {
    playFinale();
    grandFinale();
    setRevealed(true);
  };

  // gentle ongoing fireworks for a few seconds after the reveal
  useEffect(() => {
    if (!revealed) return;
    const id = window.setInterval(
      () => firework(Math.random() * 0.8 + 0.1, Math.random() * 0.35),
      650,
    );
    const stop = window.setTimeout(() => window.clearInterval(id), 6500);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, [revealed]);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-28 pt-20 text-center">
      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ----------------- the special button ----------------- */
          <motion.div
            key="button"
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex flex-col items-center"
          >
            <Eyebrow>The final moment · just press it</Eyebrow>
            <h2 className="font-display mt-5 max-w-2xl text-4xl font-bold text-pink-50 sm:text-6xl">
              And now, {DHRUTI.name}… your surprise
            </h2>
            <p className="mt-4 max-w-md text-sm text-pink-100/75 sm:text-base">
              I saved the very best for last. Take a breath, smile, and press
              the magic button. 💫
            </p>

            {/* pulsing aura */}
            <div className="relative mt-14 flex h-60 w-60 items-center justify-center">
              {[0, 1, 2].map((r) => (
                <motion.span
                  key={r}
                  className="absolute h-44 w-44 rounded-full border border-pink-300/50"
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: r * 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.button
                onClick={press}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="btn-primary relative flex h-44 w-44 flex-col items-center justify-center rounded-full text-center"
              >
                <span className="animate-heartbeat text-6xl leading-none">
                  💖
                </span>
                <span className="mt-1 text-sm font-bold uppercase tracking-[0.2em]">
                  Press me
                </span>
              </motion.button>
            </div>

            <p className="mt-10 text-xs uppercase tracking-[0.25em] text-pink-200/50">
              No peeking — press it! ✨
            </p>
          </motion.div>
        ) : (
          /* ----------------- the revealed message ----------------- */
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-7xl sm:text-8xl"
            >
              🎉
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-script mt-2 text-3xl text-amber-200 text-glow-gold sm:text-4xl"
            >
              Happy Birthday
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140 }}
              className="font-display text-6xl font-bold gradient-text sm:text-8xl"
            >
              {DHRUTI.name}!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-200/80"
            >
              <span>✦</span>
              {DHRUTI.date}
              <span>✦</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-pink-50/90 sm:text-lg"
            >
              May this new year be your most radiant yet — full of laughter that
              fills rooms, dreams that come true, and a quiet, steady knowing of
              just how loved you are. Today, tomorrow, and always. 💖
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-script mt-8 text-2xl text-pink-100/90"
            >
              from someone who thinks you're wonderful ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <GhostButton onClick={press}>🎉 Celebrate again</GhostButton>
              <GlowButton onClick={onRestart}>↺ Start from the top</GlowButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
