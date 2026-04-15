"use client"

import type { Claim } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ClaimsSummaryProps {
  claims: Claim[]
  supportedClaims: number
  totalClaims: number
}

export function ClaimsSummary({ claims, supportedClaims, totalClaims }: ClaimsSummaryProps) {
  const [expanded, setExpanded] = useState(false)
  
  const verified = supportedClaims
  const total = totalClaims
  const percentage = Math.round((verified / total) * 100)

  return (
    <div className="rounded-lg border border-border bg-card/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/30"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <span className="text-sm font-semibold text-foreground">{verified}/{total}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Claims Verified</p>
              <p className="text-xs text-muted-foreground">{percentage}% of claims have sources</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">View details</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      
      {expanded && (
        <div className="border-t border-border p-4">
          <ul className="space-y-3">
            {claims.map((claim) => (
              <li key={claim.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    claim.verified
                      ? "bg-trust-high/15 text-trust-high"
                      : "bg-trust-low/15 text-trust-low"
                  )}
                >
                  {claim.verified ? <Check size={12} /> : <X size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{claim.text}</p>
                  {claim.source && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <ExternalLink size={10} />
                      {claim.source}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
