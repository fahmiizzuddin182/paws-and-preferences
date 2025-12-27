import { motion } from "motion/react";
import logoUrl from "../assets/Paws LOGO.svg";

function Navbar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 w-full"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Logo */}
      <img src={logoUrl} alt="Logo" className="h-16 w-32" />
    </motion.div>
  );
}

export default Navbar;
