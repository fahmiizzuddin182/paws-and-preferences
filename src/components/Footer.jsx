import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

function Footer() {
  const texts = [
    <>
      By <span className="font-semibold">Muhammad Fahmi Izzuddin</span> · React
      · Tailwind · Motion
    </>,
    <>
      Images fetched from{" "}
      <span className="font-semibold">CATAAS (Cat as a Service)</span> API
    </>,
  ];

  const [index, setIndex] = useState(0);

  // Cycle between two texts
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-center text-[10px] font-sans text-gray-500 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </footer>
  );
}

export default Footer;
