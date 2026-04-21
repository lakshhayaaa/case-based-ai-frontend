"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Shield, ArrowRight, CheckCircle2, Search, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  const features = [
    {
      icon: Shield,
      title: "Trust Scores",
      description: "Every answer comes with a confidence score based on source quality and verification.",
    },
    {
      icon: CheckCircle2,
      title: "Claim Verification",
      description: "Individual claims are checked against reliable sources with full transparency.",
    },
    {
      icon: Search,
      title: "Source Transparency",
      description: "See exactly where each piece of information comes from to verify yourself.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Shield size={20} className="text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">StartupBot</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button className="gap-2">
              Get started
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20">
          <Sparkles size={40} className="text-accent" />
        </div>
        <h1 className="mt-8 max-w-3xl text-center text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          AI answers you can actually trust
        </h1>
        <p className="mt-6 max-w-xl text-center text-lg text-muted-foreground text-balance">
          StartupBot provides AI-powered answers with trust scores and claim verification, 
          so you know exactly what information to rely on.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Start for free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid max-w-4xl gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card/50 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <feature.icon size={24} className="text-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Demo preview */}
        <div className="mt-20 w-full max-w-3xl rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-3 w-3 rounded-full bg-trust-high" />
            <span>High Trust (92%)</span>
            <div className="h-3 w-3 rounded-full bg-trust-medium ml-4" />
            <span>Medium (60-79%)</span>
            <div className="h-3 w-3 rounded-full bg-trust-low ml-4" />
            <span>Low (&lt;60%)</span>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <p className="text-foreground">
              &quot;Based on extensive case analysis, climate change is primarily driven by human activities...&quot;
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">4 of 4 claims verified</span>
            <span className="text-accent">View sources →</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>StartupBot — Transparent AI answers with trust verification</p>
      </footer>
    </div>
  )
}
