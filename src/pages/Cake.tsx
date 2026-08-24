import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cake3D from "../components/Cake3D";
import { DHRUTI } from "../lib/content";
import { celebrateBurst, sparklePuff } from "../lib/confetti";
import { playJingle, playPop } from "../lib/sound";
import { Eyebrow, GlowButton, GhostButton } from "../components/ui";

const TOTAL = 5;

export default function Cake({ onNext }: { onNext: () => void }) {
  const [lit, setLit] = useState<boolean[]>(() => Array(TOTAL).fill(true));
  const [done, setDone] = useState(false);
  const celebrated = useRef(false);

  const remaining = useMemo(() => lit.filter(Boolean).length, [lit]);

  useEffect(() => {
    if (remaining === 0 && !celebrated.current) {
      celebrated.current = true;
      setDone(true);
      celebrateBurst();
      setTimeout(() => playJingle(), 250);
    }
  }, [remaining]);

  const blow = (i: number) => {
    if (!lit[i]) return;
    playPop();
    sparklePuff(0.5, 0.42);
    setLit((prev) => prev.map((v, idx) => (idx === i ? false : v)));
  };

  const relight = () => {
    celebrated.current = false;
    setDone(false);
    setLit(Array(TOTAL).fill(true));
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center px-5 pb-28 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Eyebrow>Page two · the cake</Eyebrow>
        <h2 className="font-display mt-4 text-5xl font-bold gradient-text sm:text-6xl">
          Make a Wish
        </h2>
        <p className="mt-3 max-w-md text-sm text-pink-100/75 sm:text-base">
          Close your eyes, {DHRUTI.name}… picture your most beautiful wish —
          then gently{" "}
          <span className="text-amber-200">tap each flame</span> to blow it out.
        </p>
      </motion.div>

      {/* candle progress */}
      <div className="mt-6 flex items-center gap-3">
        {lit.map((on, i) => (
          <motion.span
            key={i}
            animate={{ scale: on ? 1 : 0.7, opacity: on ? 1 : 0.35 }}
            className="text-2xl"
          >
            {on ? "🕯️" : "💨"}
          </motion.span>
        ))}
      </div>

      {/* 3D cake */}
      <div className="relative mt-2 h-[50vh] min-h-[340px] w-full max-w-3xl">
        <Cake3D candlesLit={lit} onBlow={blow} />
      </div>

      {/* status */}
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex flex-col items-center gap-5 text-center"
          >
            <p className="font-script text-3xl text-amber-200 text-glow-gold sm:text-4xl">
              Your wish is on its way to the stars… ✨
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <GhostButton onClick={relight}>↺ Light them again</GhostButton>
              <GlowButton onClick={onNext}>Continue 💌</GlowButton>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-sm text-pink-200/60"
          >
            {remaining} {remaining === 1 ? "candle" : "candles"} still
            burning · {TOTAL - remaining} blown out
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
