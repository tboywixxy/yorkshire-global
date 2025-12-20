"use client";

import { motion } from "framer-motion";

export default function HeroCornerBrand({ text }: { text: string }) {
  return (
    <motion.span
      className={[
        "inline-block select-none",
        // ✅ bigger
        "text-sm sm:text-base",
        // ✅ different font (serif)
        "font-serif font-semibold",
        // styling
        "text-white/90 tracking-wide",
      ].join(" ")}
      initial={false}
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.6 }}
    >
      {text}
    </motion.span>
  );
}
