import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 1, ease: [0.45, 0, 0.55, 1] }
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05070a]"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Animated Loader Middle */}
                        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
                            {/* Outer Rotating Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-r-2 border-primary/20 rounded-full"
                            />
                            {/* Inner Rotating Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-b-2 border-l-2 border-primary/40 rounded-full"
                            />
                            
                            {/* Center Full Logo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="z-10 p-4"
                            >
                                <img 
                                    src="/logos/logo-dark-bg copy.png" 
                                    alt="Easy Checkin" 
                                    className="h-16 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                />
                            </motion.div>
                        </div>

                        {/* Progress Line */}
                        <div className="w-56 h-[1px] bg-white/5 relative overflow-hidden">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ 
                                    duration: 2.5, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="mt-6 text-[10px] uppercase tracking-[0.8em] text-primary/40 font-light"
                        >
                            Experience Luxury
                        </motion.div>
                    </div>

                    {/* Background Subtle Gradient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
