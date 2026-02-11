import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="w-full mt-auto py-8 sm:py-10 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Psst. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://skth.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              skth.dev
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://github.com/sakeththota"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
