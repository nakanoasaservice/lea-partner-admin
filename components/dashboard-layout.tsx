import type React from "react"
import { Bell, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export function DashboardLayout({ children, currentPage = "rewards" }: DashboardLayoutProps) {
  const navigationItems = [
    { id: "rewards", label: "月次報酬一覧", icon: DollarSign, href: "/rewards" },
    { id: "partners", label: "代理店一覧", icon: Users, href: "/partners" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-bold text-balance">LEA Partner Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                管
              </div>
              <span className="text-sm font-medium">管理者</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Link key={item.id} href={item.href}>
                  <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start gap-3" size="sm">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
