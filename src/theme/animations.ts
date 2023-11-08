export const staggerChildren = (isActive: boolean, delay: number = 0) => ({
  initial: "inactive",
  animate: isActive ? "active" : "inactive",
  variants: {
    inactive: {},
    active: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  },
});

export const fadeUp = {
  variants: {
    inactive: {
      opacity: 0,
      y: 100,
    },
    active: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        opacity: {
          duration: 1,
        },
      },
    },
  },
};

export const fadeIn = (isActive: boolean, delay = 0) => ({
  initial: "inactive",
  animate: isActive ? "active" : "inactive",
  variants: {
    inactive: {
      opacity: 0,
    },
    active: {
      opacity: 1,
      transition: {
        delay,
      },
    },
  },
});
