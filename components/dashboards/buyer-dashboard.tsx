"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { RoleBasedNav } from "@/components/navigation/role-based-nav"
import {
  QrCode,
  CheckCircle,
  Flag,
  Download,
  Trophy,
  Eye,
  FileText,
  AlertTriangle,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

// Mock data for district leaderboard
const districtFarmers = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    location: "Pune, Maharashtra",
    trustedAmuPercent: 98,
    totalAnimals: 45,
    credits: 2450,
    grade: "A+",
  },
  {
    rank: 2,
    name: "Suresh Patel",
    location: "Anand, Gujarat",
    trustedAmuPercent: 96,
    totalAnimals: 38,
    credits: 2200,
    grade: "A+",
  },
  {
    rank: 3,
    name: "Manjeet Singh",
    location: "Ludhiana, Punjab",
    trustedAmuPercent: 94,
    totalAnimals: 52,
    credits: 2100,
    grade: "A",
  },
  {
    rank: 4,
    name: "Ravi Sharma",
    location: "Hisar, Haryana",
    trustedAmuPercent: 92,
    totalAnimals: 41,
    credits: 1950,
    grade: "A",
  },
  {
    rank: 5,
    name: "Amit Verma",
    location: "Jaipur, Rajasthan",
    trustedAmuPercent: 89,
    totalAnimals: 33,
    credits: 1800,
    grade: "B+",
  },
]

// Mock purchase records
const purchaseRecords = [
  {
    id: "INV001",
    farmer: "Rajesh Kumar",
    date: "2024-01-15",
    medicine: "Amoxicillin",
    quantity: 10,
    usageLogged: 8,
    status: "compliant",
  },
  {
    id: "INV002",
    farmer: "Suresh Patel",
    date: "2024-01-12",
    medicine: "Penicillin",
    quantity: 15,
    usageLogged: 18,
    status: "flagged",
  },
  {
    id: "INV003",
    farmer: "Manjeet Singh",
    date: "2024-01-10",
    medicine: "Tetracycline",
    quantity: 8,
    usageLogged: 8,
    status: "compliant",
  },
]

export function BuyerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("collector-check")
  const [qrInput, setQrInput] = useState("")
  const [complianceResult, setComplianceResult] = useState<any>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  const handleQrScan = () => {
    // Mock QR scan result
    const isCompliant = Math.random() > 0.3
    setComplianceResult({
      status: isCompliant ? "safe" : "flagged",
      animalId: qrInput || "A001",
      message: isCompliant
        ? "All recent medicines are trusted - safe for collection"
        : "Warning: High AMU risk detected - flagged entries found",
      details: isCompliant
        ? {
            lastMedicine: "Amoxicillin",
            withdrawalPeriod: "Complete",
            vetApproved: true,
          }
        : {
            lastMedicine: "Tetracycline",
            withdrawalPeriod: "3 days remaining",
            vetApproved: false,
            flags: ["rapid_repeat_dosing", "missing_media"],
          },
    })
  }

  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-blue-500" />
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800 border-green-200"
      case "A":
        return "bg-green-100 text-green-700 border-green-200"
      case "B+":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <RoleBasedNav
        activeSection={activeTab}
        onSectionChange={setActiveTab}
        className="fixed left-0 top-0 h-full z-10"
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Buyer Portal</h1>
              <p className="text-muted-foreground">Livestock collection and compliance verification</p>
            </div>
          </div>

          {activeTab === "collector-check" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Collector Check Tool</h2>
                <p className="text-muted-foreground">Scan QR codes to verify AMU compliance status</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>QR Code Scanner</CardTitle>
                  <CardDescription>Scan batch or animal ID to check compliance status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Button size="lg" className="h-24 w-48 text-lg">
                      <QrCode className="h-8 w-8 mr-3" />
                      Scan QR Code
                    </Button>
                  </div>

                  <div className="text-center text-muted-foreground">
                    <p>— OR —</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-input">Manual Entry</Label>
                    <div className="flex gap-2">
                      <Input
                        id="manual-input"
                        placeholder="Enter batch or animal ID (e.g., A001)"
                        value={qrInput}
                        onChange={(e) => setQrInput(e.target.value)}
                      />
                      <Button onClick={handleQrScan}>
                        <Eye className="h-4 w-4 mr-2" />
                        Check
                      </Button>
                    </div>
                  </div>

                  {complianceResult && (
                    <div
                      className={`p-6 rounded-lg border-2 ${
                        complianceResult.status === "safe" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {complianceResult.status === "safe" ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <Flag className="h-8 w-8 text-red-600" />
                        )}
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              complianceResult.status === "safe" ? "text-green-800" : "text-red-800"
                            }`}
                          >
                            {complianceResult.status === "safe" ? "Safe for Collection" : "Flagged: High AMU Risk"}
                          </h3>
                          <p
                            className={`text-sm ${
                              complianceResult.status === "safe" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            Animal ID: {complianceResult.animalId}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p
                          className={`font-medium ${
                            complianceResult.status === "safe" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {complianceResult.message}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Last Medicine:</p>
                            <p>{complianceResult.details.lastMedicine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Withdrawal Period:</p>
                            <p>{complianceResult.details.withdrawalPeriod}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vet Approved:</p>
                            <p>{complianceResult.details.vetApproved ? "Yes" : "No"}</p>
                          </div>
                          {complianceResult.details.flags && (
                            <div>
                              <p className="font-medium">Flags:</p>
                              <div className="flex gap-1 flex-wrap">
                                {complianceResult.details.flags.map((flag: string, idx: number) => (
                                  <Badge key={idx} variant="destructive" className="text-xs">
                                    {flag.replace(/_/g, " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t">
                          <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download Drug History Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">District-Level Farmer Ranking</h2>
                <p className="text-muted-foreground">Top farmers ranked by Trusted AMU percentage</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top 5 Compliance Champions
                  </CardTitle>
                  <CardDescription>Farmers leading in AMU compliance and trust scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {districtFarmers.map((farmer) => (
                      <div
                        key={farmer.rank}
                        className={`flex items-center justify-between p-6 border rounded-lg ${
                          farmer.rank <= 3
                            ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                            : "bg-gradient-to-r from-blue-50 to-green-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md">
                            {getTrophyIcon(farmer.rank)}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-bold">{farmer.name}</h4>
                              <Badge variant="outline" className={getGradeColor(farmer.grade)}>
                                {farmer.grade}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{farmer.location}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{farmer.totalAnimals} animals</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3 text-green-600" />
                                <span className="text-green-600">{farmer.trustedAmuPercent}% trusted</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{farmer.trustedAmuPercent}%</p>
                          <p className="text-sm text-muted-foreground">Trusted AMU</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-sm text-green-600">{farmer.credits} credits</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competition Rewards</CardTitle>
                  <CardDescription>Incentives for maintaining high compliance scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <h4 className="font-bold text-yellow-800">Gold Tier</h4>
                      <p className="text-sm text-yellow-600">95%+ Trusted AMU</p>
                      <p className="text-xs text-yellow-500 mt-1">+20% credit bonus</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-bold text-gray-800">Silver Tier</h4>
                      <p className="text-sm text-gray-600">90-94% Trusted AMU</p>
                      <p className="text-xs text-gray-500 mt-1">+15% credit bonus</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
                      <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                      <h4 className="font-bold text-amber-800">Bronze Tier</h4>
                      <p className="text-sm text-amber-600">85-89% Trusted AMU</p>
                      <p className="text-xs text-amber-500 mt-1">+10% credit bonus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "purchase-records" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Purchase Records Verification</h2>
                <p className="text-muted-foreground">Cross-check invoices against usage logs</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice vs Usage Comparison</CardTitle>
                  <CardDescription>Verify farmer purchase records against logged usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchaseRecords.map((record) => (
                      <div
                        key={record.id}
                        className={`p-4 border rounded-lg ${
                          record.status === "compliant" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">Invoice {record.id}</h4>
                              <Badge
                                variant={record.status === "compliant" ? "secondary" : "destructive"}
                                className={
                                  record.status === "compliant"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {record.status === "compliant" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {record.farmer} - {record.date}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedInvoice(selectedInvoice === record.id ? null : record.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {selectedInvoice === record.id ? "Hide" : "View"} Details
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Medicine:</p>
                            <p>{record.medicine}</p>
                          </div>
                          <div>
                            <p className="font-medium">Purchased:</p>
                            <p>{record.quantity} doses</p>
                          </div>
                          <div>
                            <p className="font-medium">Usage Logged:</p>
                            <p className={record.usageLogged > record.quantity ? "text-red-600 font-medium" : ""}>
                              {record.usageLogged} doses
                            </p>
                          </div>
                        </div>

                        {selectedInvoice === record.id && (
                          <div className="mt-4 pt-4 border-t space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-3 bg-white rounded border">
                                <h5 className="font-medium mb-2">Invoice Details</h5>
                                <div className="text-sm space-y-1">
                                  <p>Supplier: MediVet Supplies</p>
                                  <p>Batch: MV-{record.id}</p>
                                  <p>Unit Price: ₹45/dose</p>
                                  <p>Total: ₹{record.quantity * 45}</p>
                                </div>
                              </div>
                              <div className="p-3 bg-white rounded border">
                                <h5 className="font-medium mb-2">Usage Log</h5>
                                <div className="text-sm space-y-1">
                                  <p>Animals Treated: {Math.ceil(record.usageLogged / 2)}</p>
                                  <p>
                                    Avg Dose/Animal:{" "}
                                    {(record.usageLogged / Math.ceil(record.usageLogged / 2)).toFixed(1)}
                                  </p>
                                  <p>Period: 5 days</p>
                                  {record.status === "flagged" && (
                                    <p className="text-red-600 font-medium">
                                      ⚠ Usage exceeds purchase by {record.usageLogged - record.quantity} doses
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Download Invoice
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-3 w-3 mr-1" />
                                View Usage Log
                              </Button>
                              {record.status === "flagged" && (
                                <Button size="sm" variant="destructive">
                                  <Flag className="h-3 w-3 mr-1" />
                                  Flag for Review
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
