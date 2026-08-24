import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "./components/Background";
import FloatingHearts from "./components/FloatingHearts";
import { BottomNav, TopBar } from "./components/Navigation";
import { PAGES } from "./lib/pages";
import Welcome from "./pages/Welcome";
import Cake from "./pages/Cake";
import Letter from "./pages/Letter";
import Reasons from "./pages/Reasons";
import Finale from "./pages/Finale";

export default function App() {
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => {
    setIndex((prev) => {
      const next = Math.max(0, Math.min(PAGES.length - 1, i));
      if (next !== prev) window.scrollTo({ top: 0, behavior: "smooth" });
      return next;
    });
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = PAGES[index];

  const page = (() => {
    switch (current.id) {
      case "welcome":
        return <Welcome onNext={next} />;
      case "cake":
        return <Cake onNext={next} />;
      case "letter":
        return <Letter onNext={next} />;
      case "reasons":
        return <Reasons onNext={next} />;
      case "finale":
        return <Finale onRestart={() => go(0)} />;
      default:
        return null;
    }
  })();

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden">
      <Background />
      <FloatingHearts count={14} />

      <TopBar progress={(index + 1) / PAGES.length} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.985 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav current={index} onGo={go} />
    </div>
  );
}
