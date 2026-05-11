/**
 * Natya Samhitha — Shared Framer Motion Animation Variants
 *
 * Easing curves inspired by silk draping and temple architecture.
 * Use these throughout the application for consistent sacred motion.
 */

// ── Easing Curves ──
export const EASE_SILK = [0.16, 1, 0.3, 1] as const;         // Silky spring
export const EASE_TEMPLE = [0.34, 1.56, 0.64, 1] as const;   // Bouncy but refined
export const EASE_SCROLL = [0.25, 0.46, 0.45, 0.94] as const; // Smooth scroll reveal

// ── Standard Variants ──

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SILK },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_TEMPLE },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SILK },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const chipReveal = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_TEMPLE },
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_SILK },
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SILK },
  },
};

// ── Hero-specific ──

export const heroTitle = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SILK, delay: 0.2 },
  },
};

export const heroSubtitle = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SILK, delay: 0.5 },
  },
};

export const heroSearch = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_TEMPLE, delay: 0.7 },
  },
};

export const heroChips = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 1.0 },
  },
};

// ── Ink Reveal (blur → sharp, like ink settling on parchment) ──

export const inkReveal = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: EASE_SILK },
  },
};

export const cardRevealEnhanced = {
  hidden: { opacity: 0, y: 20, scale: 0.97, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_SILK },
  },
};
