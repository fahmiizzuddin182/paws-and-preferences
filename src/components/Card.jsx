import { motion, useMotionValue, useTransform, animate } from "motion/react";

function Card({ cats, currentIndex, onSwipe }) {
  const x = useMotionValue(0);
  const opacity = useMotionValue(1);
  // Rotate between -12° and +12° based on drag
  const rotate = useTransform(x, [-150, 0, 150], [-20, 0, 20]);

  if (!cats || cats.length === 0) {
    return null;
  }

  if (currentIndex >= cats.length) {
    return null;
  }

  const currentCat = cats[currentIndex];

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;

    if (offset > 100) {
      // Like
      Promise.all([
        animate(x, 300, { duration: 0.3 }),
        animate(opacity, 0, { duration: 0.25 }),
      ]).then(() => {
        onSwipe("right");
      });
    } else if (offset < -100) {
      // Dislike
      Promise.all([
        animate(x, -300, { duration: 0.3 }),
        animate(opacity, 0, { duration: 0.25 }),
      ]).then(() => {
        onSwipe("left");
      });
    } else {
      // Cancel, snap back
      animate(x, 0, { type: "spring", stiffness: 200 });
      animate(opacity, 1, { duration: 0.2 });
    }
  };

  return (
    <motion.div
      drag="x"
      style={{ x, opacity, rotate }}
      dragElastic={0.8}
      dragMomentum={true}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, borderRadius: "1.5rem" }}
      animate={{ scale: 1 }}
      whileDrag={{ borderRadius: "3rem" }}
      transition={{
        scale: { type: "spring", stiffness: 180, damping: 18 },
        borderRadius: { duration: 0.15, ease: "easeOut" },
      }}
      className="relative overflow-x-hidden rounded-3xl flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* Cats image */}
      <motion.img
        src={currentCat.url}
        alt="Cat"
        className="w-full max-w-sm aspect-3/4 max-h-[75dvh] object-cover shadow-lg select-none bg-[#e6e6e6]"
        draggable={false}
      />
      {/* Tags overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {currentCat.tags
          .filter((tag) => tag.trim() !== "") // Ignore empty strings or whitespace
          .map((tag, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/20 px-2 py-1 rounded-full shadow-sm"
            >
              <span className="text-white text-md font-semibold font-sans">
                {tag}
              </span>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

export default Card;
