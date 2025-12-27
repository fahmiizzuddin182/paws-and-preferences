import { motion, AnimatePresence } from "motion/react";
import Card from "./Card";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/solid";

function CardStack({ cats, currentIndex, onSwipe }) {
  if (!cats || cats.length === 0) return null;
  if (currentIndex >= cats.length) return null;

  return (
    <div className="relative w-96 max-w-sm aspect-3/4 max-h-[75dvh]">
      {/* Back card (next) */}
      {cats[currentIndex + 1] && (
        <div className="absolute inset-0 scale-95">
          <img
            src={cats[currentIndex + 1].url}
            alt="Next cat"
            className="w-full h-full object-cover rounded-[3rem] shadow-md blur-xs"
          />
        </div>
      )}

      {/* Front card */}
      <div className="absolute inset-0">
        <Card
          key={currentIndex}
          cats={cats}
          currentIndex={currentIndex}
          onSwipe={onSwipe}
        />
      </div>

      {/* Instruction */}
      <AnimatePresence>
        {currentIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 1 }}
            className="pointer-events-none absolute top-1/2 left-1/2 
                 -translate-x-1/2 -translate-y-1/2
                 backdrop-blur-md bg-white/10 
                 px-4 py-2 rounded-full shadow-sm"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap"
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-white" />

              <span className="text-white text-sm font-semibold font-sans">
                Swipe left or right
              </span>

              <ArrowLongRightIcon className="h-5 w-5 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardStack;
