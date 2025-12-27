import { motion } from "motion/react";
import { useRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Summary({ likedCats }) {
  return (
    <div className="flex flex-col items-center justify-center w-96 px-2 bg-[#e6e6e6] pt-28 pb-12">
      {/* Summary text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col font-sans font-semibold text-start text-[#001F3D] px-2 w-full rounded-xl shadow-4xl gap-1"
      >
        <h2>Number of cats liked</h2>
        <h1 className="text-[#ed985f] mb-4">{likedCats.length}</h1>
      </motion.div>

      {/* Images container */}
      <motion.div className="flex flex-col items-center gap-4 flex-1 w-full p-2">
        {likedCats.map((cat, index) => (
          <motion.div
            key={cat.id ?? index}
            className="relative"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
          >
            <img
              src={cat.url}
              alt={`Liked cat ${index + 1}`}
              className="w-86 h-64 object-cover rounded-xl shadow-lg"
              draggable={false}
            />

            {/* Tags overlay */}
            {cat.tags?.length > 0 && (
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                {cat.tags.filter(Boolean).map((tag, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-md bg-black/30 px-3 py-1 rounded-full"
                  >
                    <span className="text-white text-xs font-semibold font-sans">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Refresh button*/}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => window.location.reload()}
          className="p-2 rounded-full shadow-xl w-fit mb-6"
        >
          <ArrowPathIcon className="h-14 w-14" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Summary;
