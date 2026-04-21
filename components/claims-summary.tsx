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

export function ClaimsSummary() {
  return null
}
