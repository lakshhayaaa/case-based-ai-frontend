export interface User {
  id: string
  email: string
  name: string
}

export interface Claim {
  id: string
  text: string
  verified: boolean
  source?: string
}

export interface AIResponse {
  id: string
  answer: string
  trustScore: number
  claims: Claim[]
  timestamp: Date
  supportedClaims: number
  totalClaims: number
}

export interface Query {
  id: string
  question: string
  response: AIResponse
  timestamp: Date
}

export type TrustLevel = 'high' | 'medium' | 'low'

export function getTrustLevel(score: number): TrustLevel {
  if (score >= 80) return 'high'
  if (score >= 50) return 'medium'
  return 'low'
}
