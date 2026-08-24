import { motion, type Variants } from "framer-motion";
import { REASONS } from "../lib/content";
import { Eyebrow, GlowButton } from "../components/ui";

const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  }),
};

export default function Reasons({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center px-5 pb-28 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Eyebrow>Page four · just for you</Eyebrow>
        <h2 className="font-display mt-4 text-4xl font-bold gradient-text sm:text-6xl">
          Reasons You Light Up The World
        </h2>
        <p className="mt-3 max-w-xl text-sm text-pink-100/75 sm:text-base">
          I could fill a thousand pages — but here are just a few of the
          reasons you're so wonderfully you.
        </p>
      </motion.div>

      <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            custom={i}
            variants={card}
            initial="hidden"
            animate="show"
            whileHover={{ y: -8, scale: 1.03 }}
            className="glass group relative overflow-hidden rounded-3xl p-6"
          >
            {/* glow accent */}
            <div
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${r.accent} opacity-30 blur-2xl transition-opacity group-hover:opacity-60`}
            />
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${r.accent} text-2xl shadow-lg`}
            >
              {r.emoji}
            </div>
            <h3 className="font-display relative mt-4 text-2xl font-semibold text-pink-50">
              {r.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-pink-100/75">
              {r.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10"
      >
        <GlowButton pulse onClick={onNext}>
          One last surprise awaits 🎁
        </GlowButton>
      </motion.div>
    </section>
  );
}
