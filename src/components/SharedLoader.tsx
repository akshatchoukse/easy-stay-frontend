import { motion } from "framer-motion";

export const SharedLoader = ({ fullHeight = false }: { fullHeight?: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${fullHeight ? 'min-h-[80vh]' : 'py-20'}`}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t border-r border-primary/30 rounded-full"
        />
        {/* Inner Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-1.5 border-b border-l border-primary/80 rounded-full"
        />
        {/* Logo Icon in White Box */}
        <motion.div
          animate={{ scale: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-7 h-7 bg-white rounded-md flex items-center justify-center p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        >
          <img 
            src="/logos/logo-icon.png" 
            alt="EC" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SharedLoader;
