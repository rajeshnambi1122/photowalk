"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Camera, Eye, EyeOff } from "lucide-react"

interface Participant {
  _id: string
  name: string
  email: string
  phone: string
  age: number
  portfolio: string
  registeredAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Static credentials
  const ADMIN_USERNAME = "admin"
  const ADMIN_PASSWORD = "photowalk2025"

  useEffect(() => {
    const admin = localStorage.getItem("isAdminLoggedIn")
    if (admin) {
      try {
        const { loggedInAt } = JSON.parse(admin)
        const now = Date.now()
        const sevenDays = 7 * 24 * 60 * 60 * 1000
        if (now - loggedInAt <= sevenDays) {
          setIsAuthenticated(true)
          fetchParticipants()
        } else {
          localStorage.removeItem("isAdminLoggedIn")
        }
      } catch {
        localStorage.removeItem("isAdminLoggedIn")
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem(
        "isAdminLoggedIn",
        JSON.stringify({ isAdminLoggedIn: true, loggedInAt: Date.now() })
      )
      fetchParticipants()
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAdminLoggedIn")
  }

  const fetchParticipants = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/participants")
      if (response.ok) {
        const data = await response.json()
        setParticipants(data)
      }
    } catch (error) {
      console.error("Failed to fetch participants:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <p className="text-center text-gray-600">Access participant dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">Admin Dashboard</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold">{participants.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Registered Participants</CardTitle>
              <Button onClick={fetchParticipants} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Portfolio</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow key={participant._id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.phone}</TableCell>
                      <TableCell>{participant.age}</TableCell>
                      <TableCell>{participant.portfolio}</TableCell>
                      <TableCell>{new Date(participant.registeredAt).toLocaleDateString()} {new Date(participant.registeredAt).toLocaleTimeString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {participants.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">No participants registered yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
