"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  {
    name: "Filmmaking",
    href: "/#film",
  },
  {
    name: "Web Development",
    href: "https://dev.geoffvrijmoet.com",
  },
  {
    name: "Podcast Editing",
    href: "https://podcasts.geoffvrijmoet.com",
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex w-full justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" && link.href === "/#film"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
} 