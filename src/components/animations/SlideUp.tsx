"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function SlideUp({ children, delay = 0, ...rest }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
