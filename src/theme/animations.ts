export const staggerChildren = (
  isActive: boolean,
  delay: number = 0,
  staggerRate: number = 0.1,
) => ({
  initial: "inactive",
  animate: isActive ? "active" : "inactive",
  variants: {
    inactive: {},
    active: {
      transition: {
        staggerChildren: staggerRate,
        delayChildren: delay,
      },
    },
  },
});

const smooth = {
  type: "spring",
  damping: 30,
  stiffness: 150,
};

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
        ...smooth,
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

export const slideIn = {
  variants: {
    inactive: {
      opacity: 0,
      x: -50,
    },
    active: {
      opacity: 1,
      x: 0,
      transition: {
        ...smooth,
      },
    },
  },
};
