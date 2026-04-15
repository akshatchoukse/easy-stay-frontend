import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageRevealProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    }
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function PageReveal({ children }: PageRevealProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export { childVariants };
