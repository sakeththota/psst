import { KeyRound, Timer, ShieldCheck } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const features = [
  {
    icon: KeyRound,
    title: 'No sign-up required',
    description:
      'Jump straight into a conversation. No accounts, no passwords, no friction. Just pick a name and go.',
  },
  {
    icon: Timer,
    title: 'Ephemeral by design',
    description:
      'Messages exist only in the moment. Refresh the page and they\'re gone forever. Nothing persists.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-focused',
    description:
      'Your conversations stay between you and your room. Nothing is stored, logged, or tracked.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full min-h-dvh flex items-center px-6 sm:px-8 py-12 sm:py-16 scroll-mt-0">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide uppercase">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple by default.{' '}
            <span className="text-muted-foreground">Private by design.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            No setup. No complexity. Just open a room and start a conversation that disappears when you&apos;re done.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/40 transition-colors duration-300 hover:border-border/70"
            >
              <CardHeader>
                <div className="flex items-center justify-center size-10 rounded-lg bg-muted/60 text-foreground/70 mb-1">
                  <feature.icon className="size-5" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </section>
  )
}
