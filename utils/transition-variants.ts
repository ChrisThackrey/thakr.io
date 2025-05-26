// Define transition variants for different page transitions
export const transitionVariants = {
  // Default transition - simple fade
  default: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  // Blog section - slide from right
  blog: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  // Projects section - scale up
  projects: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  // Architecture section - fade up
  architecture: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  // About section - simple fade (removed rotation)
  about: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  // Work section - fade up (removed perspective)
  work: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

// Function to get the appropriate transition variant based on the pathname
export function getTransitionVariant(pathname: string) {
  if (pathname === "/" || pathname === "") {
    return transitionVariants.default
  } else if (pathname.startsWith("/blog")) {
    return transitionVariants.blog
  } else if (pathname.startsWith("/projects")) {
    return transitionVariants.projects
  } else if (pathname.startsWith("/architecture")) {
    return transitionVariants.architecture
  } else if (pathname.startsWith("/about")) {
    return transitionVariants.about
  } else if (pathname.startsWith("/work")) {
    return transitionVariants.work
  }

  return transitionVariants.default
}
