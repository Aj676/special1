import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Small uppercase eyebrow label with decorative lines. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-pink-300/60" />
      <span>{children}</span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-pink-300/60" />
    </div>
  );
}

/** Glowing primary button with springy tap/hover motion. */
export function GlowButton({
  children,
  onClick,
  className = "",
  pulse = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold ${
        pulse ? "animate-pulse-glow" : ""
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

/** Ghost / secondary button. */
export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-pink-50 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 ${className}`}
    >
      {children}
    </motion.button>
  );
}
