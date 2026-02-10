import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full bg-background">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 sm:px-8 h-16">
        <Link href="/" className="text-base font-bold tracking-tight">
          Psst
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="#features">Features</a>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://github.com/sakeththota/psst"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </nav>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </header>
  )
}
