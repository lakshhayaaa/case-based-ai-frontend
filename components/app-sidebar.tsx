"use client"

import { useAuth } from "@/lib/auth-context"
import { useQuery } from "@/lib/query-context"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  History, 
  LogOut, 
  Trash2, 
  Shield,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AppSidebar() {
  const { user, logout } = useAuth()
  const { queries, clearHistory } = useQuery()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "New Query", icon: Plus },
    { href: "/history", label: "History", icon: History },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Shield size={18} className="text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">StartupBot</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon size={18} />
              {item.label}
              {item.href === "/history" && queries.length > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-xs font-semibold text-sidebar-primary-foreground">
                  {queries.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Recent queries */}
        {queries.length > 0 && (
          <div className="border-t border-sidebar-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase text-muted-foreground">Recent</p>
              <button
                onClick={clearHistory}
                className="text-muted-foreground transition-colors hover:text-destructive"
                title="Clear history"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <ul className="space-y-1">
              {queries.slice(0, 5).map((query) => (
                <li key={query.id}>
                  <Link
                    href="/history"
                    onClick={() => setIsOpen(false)}
                    className="block truncate rounded px-2 py-1.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/50"
                  >
                    {query.question}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
