"use client"

import type { Query } from "@/lib/types"
import { TrustBadge } from "./trust-badge"
import { ClaimsSummary } from "./claims-summary"
import { Bot, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ResponseCardProps {
  query: Query
}

export function ResponseCard({ query }: ResponseCardProps) {
  return (
    <div className="space-y-6">
      {/* User Question */}
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
          <User size={20} className="text-secondary-foreground" />
        </div>
        <div className="flex-1 pt-2">
          <p className="text-foreground">{query.question}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDistanceToNow(query.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
          <Bot size={20} className="text-accent-foreground" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TrustBadge score={query.response.trustScore} />
            <span className="text-xs text-muted-foreground">
              {query.response.supportedClaims} of {query.response.totalClaims} claims verified
            </span>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-foreground leading-relaxed">{query.response.answer}</p>
          </div>
          
          <ClaimsSummary
          claims={query.response.claims}
          supportedClaims={query.response.supportedClaims}
          totalClaims={query.response.totalClaims}
          />
        </div>
      </div>
    </div>
  )
}
