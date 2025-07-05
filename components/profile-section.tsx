"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ChrisThackrey",
    icon: Icons.gitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-thackrey-015/",
    icon: Icons.linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/chris_thackrey/",
    icon: Icons.instagram,
  },
  {
    name: "Email",
    href: "/contact",
    icon: Icons.mail,
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
            className="rounded-full hover:bg-primary/10 transition-colors bg-transparent"
          >
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.name}
            >
              <link.icon className="h-9 w-9" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
