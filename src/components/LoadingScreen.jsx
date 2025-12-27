import { motion } from "motion/react";
import logoUrl from "../assets/Paws LOGO.svg";

function LoadingScreen({ progress }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-screen p-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Logo */}
      <img src={logoUrl} alt="Logo" className="h-20 w-32" />

      {/* Progress bar */}
      <div className="w-80 h-4 bg-gray-300 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#ed985f] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 10}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="mt-2 text-sm font-semibold font-sans text-[#001F3D]">
        {progress * 10}%
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
