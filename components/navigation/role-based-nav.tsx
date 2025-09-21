"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth, type UserRole } from "@/lib/auth"
import {
  Home,
  Activity,
  Bot,
  Wallet,
  Award,
  FileText,
  TestTube,
  BarChart3,
  Users,
  MapPin,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  Wheat,
  Stethoscope,
  Building2,
  Flag,
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
}

interface RoleNavConfig {
  role: UserRole
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

const navigationConfig: RoleNavConfig[] = [
  {
    role: "farmer",
    title: "Farmer Portal",
    subtitle: "Livestock Management & Compliance",
    icon: Wheat,
    items: [
      {
        id: "dashboard",
        label: "Digital Twin",
        icon: Home,
        description: "3D animal model and health monitoring",
      },
      {
        id: "amu",
        label: "AMU Monitoring",
        icon: Activity,
        description: "Track antimicrobial usage",
        badge: "3.2 mg/kg",
      },
      {
        id: "ai-vets",
        label: "AI & Vets",
        icon: Bot,
        description: "AI consultation and vet verification",
        badge: "2 pending",
      },
      {
        id: "bio-credit",
        label: "Bio-Credit Wallet",
        icon: Wallet,
        description: "Earn and trade sustainability credits",
        badge: "1,247",
      },
      {
        id: "subsidies",
        label: "Govt Subsidies",
        icon: Award,
        description: "Available subsidies and eligibility",
        badge: "3 available",
      },
    ],
  },
  {
    role: "vet",
    title: "Veterinarian Portal",
    subtitle: "Prescription Review & MRL Testing",
    icon: Stethoscope,
    items: [
      {
        id: "reviews",
        label: "Prescription Reviews",
        icon: FileText,
        description: "Review AI-generated prescriptions",
        badge: "5 pending",
      },
      {
        id: "mrl-tests",
        label: "MRL Test Management",
        icon: TestTube,
        description: "Schedule and manage residue tests",
        badge: "3 scheduled",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        description: "Review performance metrics",
      },
    ],
  },
  {
    role: "mofahd",
    title: "MoFAHD Admin",
    subtitle: "National Compliance & Analytics",
    icon: Building2,
    items: [
      {
        id: "overview",
        label: "National Overview",
        icon: BarChart3,
        description: "AMU trends and compliance metrics",
      },
      {
        id: "districts",
        label: "District Analysis",
        icon: MapPin,
        description: "Performance leaderboard and rankings",
      },
      {
        id: "compliance",
        label: "Compliance Monitoring",
        icon: AlertTriangle,
        description: "Issues tracking and achievements",
        badge: "34 issues",
      },
      {
        id: "farmers",
        label: "Farmer Management",
        icon: Users,
        description: "Registered farmers and statistics",
        badge: "12,450",
      },
      {
        id: "credits",
        label: "Credit Economy",
        icon: Wallet,
        description: "Bio-credit trading and analytics",
      },
      {
        id: "vets",
        label: "Veterinarian Performance",
        icon: Stethoscope,
        description: "Vet leaderboard and metrics",
      },
      {
        id: "insights",
        label: "Policy Insights",
        icon: BarChart3,
        description: "AI-generated recommendations",
      },
      {
        id: "subsidies",
        label: "Subsidy Analysis",
        icon: Award,
        description: "Impact and adoption tracking",
      },
      {
        id: "alerts",
        label: "System Alerts",
        icon: AlertTriangle,
        description: "Critical notifications",
        badge: "2",
      },
      {
        id: "audit-queue",
        label: "Audit Queue",
        icon: Flag,
        description: "Review flagged events across all farmers",
        badge: "34",
      },
    ],
  },
]

interface RoleBasedNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  className?: string
}

export function RoleBasedNav({ activeSection, onSectionChange, className = "" }: RoleBasedNavProps) {
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  const config = navigationConfig.find((config) => config.role === user.role)
  if (!config) return null

  const RoleIcon = config.icon

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col ${isCollapsed ? "w-16" : "w-64"} ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sidebar-primary rounded-lg">
                <RoleIcon className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">{config.title}</h2>
                <p className="text-xs text-sidebar-foreground/70">{config.subtitle}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="mt-3 p-2 bg-sidebar-accent rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-sidebar-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-accent-foreground/70 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {config.items.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`ml-2 text-xs ${
                            isActive
                              ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                              : item.id === "audit-queue"
                                ? "bg-red-100 text-red-800"
                                : "bg-sidebar-primary/20 text-sidebar-primary"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {item.description && <p className="text-xs opacity-70 truncate mt-0.5">{item.description}</p>}
                  </div>
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 flex-shrink-0">
        <Button
          onClick={logout}
          variant="outline"
          className={`w-full bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent ${
            isCollapsed ? "px-2" : ""
          }`}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
