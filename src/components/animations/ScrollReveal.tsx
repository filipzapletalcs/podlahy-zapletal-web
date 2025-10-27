'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const directionOffset = {
    up: { y: Math.min(distance, 30), x: 0 },
    down: { y: -Math.min(distance, 30), x: 0 },
    left: { x: Math.min(distance, 30), y: 0 },
    right: { x: -Math.min(distance, 30), y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...directionOffset[direction]
      }}
      transition={{
        duration: Math.min(duration, 0.5),
        delay: Math.min(delay, 0.2),
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};