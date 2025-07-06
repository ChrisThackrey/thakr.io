// Define animation variants for content reveals in different sections
export const contentAnimationVariants = {
  // Home page - staggered fade up
  home: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  },

  // Blog section - slide in from right with stagger
  blog: {
    hidden: { opacity: 0, x: 15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.3 },
    },
  },

  // Projects section - scale up with stagger
  projects: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.3 },
    },
  },

  // Architecture section - reveal from bottom (removed rotation)
  architecture: {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.3 },
    },
  },

  // About section - standard fade up (no rotation)
  about: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  },

  // Work section - slide up (removed perspective and rotation)
  work: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.13,
        duration: 0.55,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.3 },
    },
  },
}

// Function to get the appropriate content animation variant based on the pathname
export function getContentAnimationVariant(pathname: string) {
  if (pathname === "/" || pathname === "") {
    return contentAnimationVariants.home
  } else if (pathname.startsWith("/blog")) {
    return contentAnimationVariants.blog
  } else if (pathname.startsWith("/projects")) {
    return contentAnimationVariants.projects
  } else if (pathname.startsWith("/architecture")) {
    return contentAnimationVariants.architecture
  } else if (pathname.startsWith("/about")) {
    return contentAnimationVariants.about
  } else if (pathname.startsWith("/work")) {
    return contentAnimationVariants.work
  }

  return contentAnimationVariants.home
}
