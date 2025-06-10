"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ChrisThackrey",
    icon: <Github className="h-9 w-9" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-thackrey-015/",
    icon: <Linkedin className="h-9 w-9" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/chris_thackrey/",
    icon: <Instagram className="h-9 w-9" />,
  },
  {
    name: "Email",
    href: "mailto:c.r.thackrey@gmail.com",
    icon: <Mail className="h-9 w-9" />,
  },
]

export function ProfileSection() {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-52 h-52 md:w-60 md:h-60 border-4 border-primary/20 shadow-lg mb-8 md:mb-6">
        <AvatarImage src="/images/profile-1.jpg" alt="Chris Thackrey" />
        <AvatarFallback>CT</AvatarFallback>
      </Avatar>
      <div className="flex space-x-6">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="lg"
            asChild
            className="rounded-full hover:bg-primary/10 transition-colors"
          >
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
