export const siteConfig = {
  name: "Chris Thackrey",
  url: "https://www.christhackrey.com",
  ogImage: "https://www.christhackrey.com/og.jpg",
  description:
    "Personal website and portfolio of Chris Thackrey, a full-stack software engineer specializing in AI-driven applications and modern web technologies.",
  author: {
    name: "Chris Thackrey",
  },
  links: {
    github: "https://github.com/ChrisThackrey",
    linkedin: "https://www.linkedin.com/in/chris-thackrey-015/",
    instagram: "https://www.instagram.com/christhackrey/",
    email: "mailto:c.r.thackrey@gmail.com",
  },
  navLinks: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "user" },
    { href: "/work", label: "Work", icon: "briefcase" },
    { href: "/projects", label: "Projects", icon: "code" },
    { href: "/architecture", label: "Architecture", icon: "architecture" },
    { href: "/blog", label: "Blog", icon: "fileText" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ],
  contact: {
    email: "c.r.thackrey@gmail.com",
    phone: "(707) 319-3306",
    location: "San Antonio, TX",
  },
  resumeUrl: "/Chris-Thackrey-Resume.pdf",
}

export type SiteConfig = typeof siteConfig
