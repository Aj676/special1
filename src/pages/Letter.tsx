import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DHRUTI, LETTER_PARAGRAPHS } from "../lib/content";
import { playSparkle } from "../lib/sound";
import { Eyebrow, GlowButton, GhostButton } from "../components/ui";

type Phase = "closed" | "opening" | "open";

export default function Letter({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");

  const open = () => {
    playSparkle();
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 650);
  };

  const reset = () => setPhase("closed");

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Eyebrow>Page three · from the heart</Eyebrow>
        <h2 className="font-display mt-4 text-5xl font-bold text-pink-50 sm:text-6xl">
          A Letter For You
        </h2>
      </motion.div>

      <div className="relative mt-10 flex w-full flex-1 items-start justify-center">
        <AnimatePresence mode="wait">
          {phase !== "open" ? (
            /* ---------------- closed envelope ---------------- */
            <motion.button
              key="envelope"
              onClick={phase === "closed" ? open : undefined}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              whileHover={{ scale: phase === "closed" ? 1.04 : 1 }}
              className="relative mt-6 aspect-[3/2] w-[min(82vw,420px)]"
              style={{ perspective: 1200 }}
            >
              {/* body */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 shadow-[0_30px_60px_-15px_rgba(255,111,174,0.6)]" />
              {/* inner triangle shading */}
              <div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)",
                  clipPath:
                    "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              {/* flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2"
                style={{ transformOrigin: "top" }}
                animate={{
                  rotateX: phase === "closed" ? 0 : -178,
                  zIndex: phase === "closed" ? 6 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    background:
                      "linear-gradient(135deg, #ff9ec7, #e26aa8 60%, #c84aa0)",
                    boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.18)",
                  }}
                />
              </motion.div>

              {/* wax seal */}
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-500 text-2xl font-bold text-white shadow-lg ring-4 ring-rose-300/40 animate-heartbeat">
                {DHRUTI.initials}
              </div>

              {/* hint */}
              {phase === "closed" && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-pink-200/80">
                  💌 Tap to open your letter
                </div>
              )}
            </motion.button>
          ) : (
            /* ---------------- open letter card ---------------- */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass relative mt-2 w-[min(92vw,640px)] rounded-3xl p-8 sm:p-12"
              style={{ transformOrigin: "top" }}
            >
              {/* sparkle corner */}
              <div className="absolute -right-3 -top-3 text-3xl animate-floaty">
                ✨
              </div>

              <p className="text-center text-xs uppercase tracking-[0.3em] text-amber-200/80">
                ✉ A letter for you
              </p>

              <h3 className="font-script mt-4 text-center text-4xl text-pink-100 sm:text-5xl">
                Dear {DHRUTI.name},
              </h3>

              <div className="mt-6 space-y-4">
                {LETTER_PARAGRAPHS.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
                    className="font-display text-lg leading-relaxed text-pink-50/90 sm:text-xl"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="font-script text-right text-3xl text-amber-200">
                  Forever celebrating you,
                </p>
                <p className="mt-1 text-right text-sm text-pink-200/60">
                  made with love · {DHRUTI.date}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <GhostButton onClick={reset}>↺ Read again</GhostButton>
                <GlowButton onClick={onNext}>Continue 🌟</GlowButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
