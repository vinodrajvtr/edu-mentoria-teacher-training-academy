import { motion } from "motion/react";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0d1945",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          color: "#C8DC00",
          fontSize: 24,
          fontWeight: 800,
          fontFamily: "Montserrat, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "6px",
        }}
      >
        Edu Mentoria
      </motion.div>
    </motion.div>
  );
}
