"use client"

import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { FarmerDashboard } from "@/components/dashboards/farmer-dashboard"
import { VetDashboard } from "@/components/dashboards/vet-dashboard"
import { MofahdDashboard } from "@/components/dashboards/mofahd-dashboard"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  switch (user.role) {
    case "farmer":
      return <FarmerDashboard />
    case "vet":
      return <VetDashboard />
    case "mofahd":
      return <MofahdDashboard />
    default:
      return <LoginForm />
  }
}
