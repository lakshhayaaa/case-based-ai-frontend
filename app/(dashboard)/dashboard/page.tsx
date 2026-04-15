"use client"

import { useState } from "react"
import { useQuery } from "@/lib/query-context"
import { QueryInput } from "@/components/query-input"
import { ResponseCard } from "@/components/response-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { EmptyState } from "@/components/empty-state"
import type { Query } from "@/lib/types"
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authLoading && !user) {
    router.replace("/login");
  }
}, [user, authLoading]);
  const { submitQuery, isLoading } = useQuery()
  const [currentQuery, setCurrentQuery] = useState<Query | null>(null)
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)

  const handleSubmit = async (question: string) => {
    setPendingQuestion(question)
    setCurrentQuery(null)
    const response = await submitQuery(question)
    setCurrentQuery(response)
    setPendingQuestion(null)
  }
  if (authLoading) return <div>Loading...</div>;
  if (!user) return null;
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="md:hidden" /> {/* Spacer for mobile menu button */}
        <h1 className="text-lg font-semibold text-foreground">New Query</h1>
        <div /> {/* Spacer */}
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Response area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl p-4 md:p-6">
            {currentQuery ? (
              <ResponseCard query={currentQuery} />
            ) : isLoading && pendingQuestion ? (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <span className="text-sm font-medium text-secondary-foreground">Y</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-foreground">{pendingQuestion}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <LoadingSkeleton />
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Query input */}
        <div className="shrink-0 border-t border-border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-3xl">
            <QueryInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Ask a question to get a verified answer..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
