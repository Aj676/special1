import { useState } from "react";
import { motion } from "framer-motion";
import { PAGES } from "../lib/pages";
import { DHRUTI } from "../lib/content";
import { setMuted } from "../lib/sound";

export function TopBar({ progress }: { progress: number }) {
  const [muted, setMutedState] = useState(false);

  const toggle = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* progress line */}
      <div className="h-1 w-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400"
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-violet-500 text-sm font-bold text-white shadow-lg">
            {DHRUTI.initials}
          </span>
          <span className="hidden text-sm font-medium text-pink-100/80 sm:block">
            A surprise for{" "}
            <span className="font-semibold text-pink-50">{DHRUTI.name}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-amber-200/90 backdrop-blur sm:block">
            🎂 {DHRUTI.shortDate}
          </span>
          <button
            onClick={toggle}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base backdrop-blur transition hover:bg-white/10"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav({
  current,
  onGo,
}: {
  current: number;
  onGo: (i: number) => void;
}) {
  const canPrev = current > 0;
  const canNext = current < PAGES.length - 1;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
      <div className="glass flex items-center gap-1.5 rounded-full p-2">
        <button
          disabled={!canPrev}
          onClick={() => canPrev && onGo(current - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-pink-100 transition enabled:hover:bg-white/10 disabled:opacity-30"
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="flex items-center gap-1">
          {PAGES.map((p, i) => {
            const active = i === current;
            return (
              <button
                key={p.id}
                onClick={() => onGo(i)}
                className="group flex items-center gap-2 rounded-full px-2 py-1.5 transition"
                aria-label={p.label}
              >
                <span
                  className={`text-lg transition ${
                    active ? "scale-110" : "opacity-50 grayscale group-hover:opacity-90"
                  }`}
                >
                  {p.emoji}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    width: active ? "auto" : 0,
                    opacity: active ? 1 : 0,
                    marginRight: active ? 8 : 0,
                  }}
                  className="overflow-hidden whitespace-nowrap text-xs font-semibold text-pink-50"
                >
                  {p.label}
                </motion.span>
              </button>
            );
          })}
        </div>

        <button
          disabled={!canNext}
          onClick={() => canNext && onGo(current + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-pink-100 transition enabled:hover:bg-white/10 disabled:opacity-30"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </nav>
  );
}
