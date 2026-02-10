import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full mt-auto py-8 sm:py-10 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Psst. All rights reserved.
        </p>

        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <a
            href="https://skth.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            skth.dev
          </a>
          <a
            href="https://github.com/sakeththota/psst"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <Github className="size-3.5" />
            Source
          </a>
        </div>
      </div>
    </footer>
  )
}
