"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserRole } from "@/lib/auth"
import { Loader2, Wheat, Stethoscope, Building2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("farmer")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(email, password, role)
    if (!success) {
      setError("Invalid credentials")
    }
  }

  const getRoleIcon = (roleType: UserRole) => {
    switch (roleType) {
      case "farmer":
        return <Wheat className="h-4 w-4" />
      case "vet":
        return <Stethoscope className="h-4 w-4" />
      case "mofahd":
        return <Building2 className="h-4 w-4" />
    }
  }

  const getRoleDescription = (roleType: UserRole) => {
    switch (roleType) {
      case "farmer":
        return "Manage livestock, track AMU, and access AI recommendations"
      case "vet":
        return "Review prescriptions and schedule MRL tests"
      case "mofahd":
        return "Monitor AMU analytics and compliance across regions"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Agricultural Management System</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("farmer")}
                      <span>Farmer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="vet">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("vet")}
                      <span>Veterinarian</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mofahd">
                    <div className="flex items-center gap-2">
                      {getRoleIcon("mofahd")}
                      <span>MoFAHD Official</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">{getRoleDescription(role)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  {getRoleIcon(role)}
                  <span className="ml-2">Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo credentials: Use any email and password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
