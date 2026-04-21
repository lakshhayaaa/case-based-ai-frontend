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

  <div className="flex-1">
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-foreground leading-relaxed">
        {query.response.answer}
      </p>
    </div>
  </div>
</div>
    </div>
  )
}
