import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
