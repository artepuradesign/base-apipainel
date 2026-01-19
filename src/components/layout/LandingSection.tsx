import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LandingSectionTone = "default" | "muted" | "elevated";

interface LandingSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: LandingSectionTone;
}

const toneClassName: Record<LandingSectionTone, string> = {
  default: "bg-transparent",
  muted: "bg-muted/30",
  elevated: "bg-card/60 backdrop-blur-sm border-y border-border"
};

export default function LandingSection({
  children,
  id,
  className,
  tone = "default"
}: LandingSectionProps) {
  return (
    <section id={id} className={cn("w-full", toneClassName[tone], className)}>
      <motion.div
        className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
