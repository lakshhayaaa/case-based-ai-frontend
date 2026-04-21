"use client"

import { useQuery } from "@/lib/query-context"
import { ResponseCard } from "@/components/response-card"
import { TrustBadge } from "@/components/trust-badge"
import { Button } from "@/components/ui/button"
import { History, Trash2, Clock, ChevronRight } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { useState } from "react"
import type { Query } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function HistoryPage() {
  const { queries, clearHistory } = useQuery()
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)

  if (queries.length === 0) {
    return (
      <div className="flex h-screen flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
          <div className="md:hidden" />
          <h1 className="text-lg font-semibold text-foreground">History</h1>
          <div />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <History size={32} className="text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">No queries yet</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Your query history will appear here after you ask your first question.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="md:hidden" />
        <h1 className="text-lg font-semibold text-foreground">History</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="gap-2 text-muted-foreground hover:text-destructive"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Clear all</span>
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Query list */}
        <div
          className={cn(
            "w-full border-r border-border md:w-80 lg:w-96",
            selectedQuery ? "hidden md:block" : "block"
          )}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {queries.length} {queries.length === 1 ? "query" : "queries"}
              </p>
              <ul className="space-y-2">
                {queries.map((query) => (
                  <li key={query.id}>
                    <button
                      onClick={() => setSelectedQuery(query)}
                      className={cn(
                        "w-full rounded-lg border p-4 text-left transition-colors",
                        selectedQuery?.id === query.id
                          ? "border-accent bg-accent/10"
                          : "border-border bg-card hover:border-accent/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 font-medium text-foreground">
                          {query.question}
                        </p>
                        <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {formatDistanceToNow(query.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Query detail */}
        <div
          className={cn(
            "flex-1 overflow-y-auto",
            selectedQuery ? "block" : "hidden md:flex md:items-center md:justify-center"
          )}
        >
          {selectedQuery ? (
            <div className="p-4 md:p-6">
              <div className="mx-auto max-w-3xl">
                {/* Mobile back button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedQuery(null)}
                  className="mb-4 gap-2 md:hidden"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  Back to list
                </Button>

                {/* Date header */}
                <p className="mb-6 text-sm text-muted-foreground">
                  {format(selectedQuery.timestamp, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                </p>

                <ResponseCard query={selectedQuery} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-muted">
                <History size={32} className="text-muted-foreground" />
              </div>
              <p className="mt-4 text-muted-foreground">
                Select a query to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
