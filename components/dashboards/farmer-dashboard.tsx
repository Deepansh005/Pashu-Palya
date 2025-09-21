"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/lib/language"
import { RoleBasedNav } from "@/components/navigation/role-based-nav"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import {
  Upload,
  Mic,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  Coins,
  Camera,
  Video,
  Shield,
  Flag,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for charts
const amuData = [
  { month: "Jan", usage: 12 },
  { month: "Feb", usage: 8 },
  { month: "Mar", usage: 15 },
  { month: "Apr", usage: 6 },
  { month: "May", usage: 4 },
  { month: "Jun", usage: 3 },
]

const dosageHistory = [
  { date: "2024-01-15", medicine: "Amoxicillin", dosage: "500mg", reason: "Respiratory infection" },
  { date: "2024-01-08", medicine: "Penicillin", dosage: "300mg", reason: "Wound treatment" },
  { date: "2023-12-20", medicine: "Tetracycline", dosage: "250mg", reason: "Preventive care" },
]

const subsidies = [
  { title: "Organic Farming Incentive", amount: "₹25,000", eligibility: "Eligible", status: "pending" },
  { title: "Livestock Insurance Subsidy", amount: "₹15,000", eligibility: "Eligible", status: "approved" },
  { title: "AMU Reduction Bonus", amount: "₹10,000", eligibility: "Qualified", status: "available" },
]

// Mock data for medicine entries with status tracking
const medicineEntries = [
  {
    id: 1,
    medicine: "Amoxicillin",
    dose: "500mg",
    date: "2024-01-15",
    status: "trusted",
    mediaUrls: ["/placeholder-xxdsq.png"],
    vetApproved: true,
    vetId: "Dr. Smith",
    reason: "Respiratory infection",
  },
  {
    id: 2,
    medicine: "Penicillin",
    dose: "300mg",
    date: "2024-01-12",
    status: "provisional",
    mediaUrls: [],
    vetApproved: false,
    reason: "Wound treatment",
  },
  {
    id: 3,
    medicine: "Tetracycline",
    dose: "250mg",
    date: "2024-01-10",
    status: "flagged",
    mediaUrls: ["/placeholder-thrr3.png"],
    vetApproved: false,
    flags: ["missing_media", "rapid_repeat_dosing"],
    reason: "Preventive care",
  },
]

export function FarmerDashboard() {
  const { user } = useAuth()
  const { translate } = useLanguage()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [consultationInput, setConsultationInput] = useState("")
  const [consultationType, setConsultationType] = useState<"text" | "voice" | "image">("text")
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null)

  const handleConsultationSubmit = () => {
    // Mock AI response
    alert(
      "AI Recommendation: Based on symptoms, consider Amoxicillin 500mg twice daily for 5 days. Vet verification pending.",
    )
    setConsultationInput("")
  }

  const handleMediaUpload = (entryId: number) => {
    setSelectedEntry(entryId)
    setShowMediaUpload(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trusted":
        return "bg-green-100 text-green-800"
      case "provisional":
        return "bg-yellow-100 text-yellow-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance">{translate("Digital Twin Dashboard")}</h1>
              <p className="text-muted-foreground">
                {translate("Monitor your livestock health and compliance status")}
              </p>
            </div>

            {/* Digital Twin Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{translate("3D Animal Model - Cow #A001")}</CardTitle>
                  <CardDescription>{translate("Interactive digital twin of your livestock")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-200">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🐄</div>
                      <p className="text-muted-foreground">3D Model Integration</p>
                      <p className="text-sm text-muted-foreground">Click and drag to rotate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translate("Animal Details")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{translate("Health Status")}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {translate("Healthy")}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Breed</p>
                    <p className="text-sm">Holstein Friesian</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-sm">3 years, 2 months</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-sm">650 kg</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{translate("Recent Medicines")}</p>
                      <Button size="sm" variant="outline" onClick={() => handleMediaUpload(0)} className="text-xs">
                        <Upload className="h-3 w-3 mr-1" />
                        {translate("Upload Evidence")}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {medicineEntries.map((entry) => (
                        <div key={entry.id} className="p-3 border rounded-lg space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium">{entry.medicine}</p>
                              <p className="text-xs text-muted-foreground">
                                {entry.dose} - {entry.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {entry.vetApproved && <Shield className="h-3 w-3 text-green-600" title="Vet Approved" />}
                              <Badge variant="secondary" className={getStatusBadge(entry.status)}>
                                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          {/* Media thumbnails */}
                          {entry.mediaUrls.length > 0 && (
                            <div className="flex gap-2">
                              {entry.mediaUrls.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url || "/placeholder.svg"}
                                  alt="Evidence"
                                  className="w-8 h-8 rounded object-cover border"
                                />
                              ))}
                            </div>
                          )}

                          {/* Flags */}
                          {entry.status === "flagged" && entry.flags && (
                            <div className="flex gap-1">
                              {entry.flags.map((flag, idx) => (
                                <Badge key={idx} variant="destructive" className="text-xs">
                                  <Flag className="h-2 w-2 mr-1" />
                                  {flag.replace(/_/g, " ")}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* MRL Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("MRL Monitoring")}</CardTitle>
                <CardDescription>{translate("Maximum Residue Limit compliance status")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">{translate("Milk Products")}</p>
                      <p className="text-sm text-green-600">{translate("Safe for consumption")}</p>
                      <p className="text-xs text-green-500">{translate("Withdrawal period: Complete")}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {translate("Safe")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <p className="font-medium text-yellow-800">{translate("Meat Products")}</p>
                      <p className="text-sm text-yellow-600">{translate("Withdrawal period active")}</p>
                      <p className="text-xs text-yellow-500">{translate("Days remaining: 3")}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {translate("Caution")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "amu" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{translate("AMU Monitoring")}</h1>
              <p className="text-muted-foreground">{translate("Track antimicrobial usage and compliance")}</p>
            </div>

            {/* AMU Rate Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Current AMU Rate")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">3.2</span>
                    <span className="text-sm text-muted-foreground">mg/kg</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{translate("↓ 15% from last month")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Baseline Target")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">5.0</span>
                    <span className="text-sm text-muted-foreground">mg/kg</span>
                  </div>
                  <Progress value={64} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">{translate("36% below target")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Compliance Score")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">A+</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{translate("Excellent compliance")}</p>
                </CardContent>
              </Card>
            </div>

            {/* AMU Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("AMU Usage Over Time")}</CardTitle>
                <CardDescription>{translate("Monthly antimicrobial usage trends")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={amuData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#d97706" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Dosage History */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Recent Dosage History")}</CardTitle>
                <CardDescription>{translate("Last administered medicines and dosages")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dosageHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{entry.medicine}</p>
                        <p className="text-sm text-muted-foreground">{entry.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.dosage}</p>
                        <p className="text-xs text-muted-foreground">{entry.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "ai-vets" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{translate("AI & Vets")}</h1>
              <p className="text-muted-foreground">{translate("Get AI recommendations and vet verification")}</p>
            </div>

            {/* Input Options */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Describe Your Animal's Condition")}</CardTitle>
                <CardDescription>{translate("Choose your preferred input method")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={consultationType === "text" ? "default" : "outline"}
                    onClick={() => setConsultationType("text")}
                    size="sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {translate("Text")}
                  </Button>
                  <Button
                    variant={consultationType === "voice" ? "default" : "outline"}
                    onClick={() => setConsultationType("voice")}
                    size="sm"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    {translate("Voice")}
                  </Button>
                  <Button
                    variant={consultationType === "image" ? "default" : "outline"}
                    onClick={() => setConsultationType("image")}
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {translate("Image")}
                  </Button>
                </div>

                {consultationType === "text" && (
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">{translate("Describe symptoms or concerns")}</Label>
                    <Textarea
                      id="symptoms"
                      placeholder={translate(
                        "e.g., Animal showing signs of lethargy, reduced appetite, slight fever...",
                      )}
                      value={consultationInput}
                      onChange={(e) => setConsultationInput(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                {consultationType === "voice" && (
                  <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{translate("Click to start voice recording")}</p>
                    <Button className="mt-4">{translate("Start Recording")}</Button>
                  </div>
                )}

                {consultationType === "image" && (
                  <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{translate("Upload images of your animal")}</p>
                    <Button className="mt-4">{translate("Choose Files")}</Button>
                  </div>
                )}

                <Button onClick={handleConsultationSubmit} className="w-full">
                  {translate("Get AI Recommendation")}
                </Button>
              </CardContent>
            </Card>

            {/* Vet Review Panel */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Vet Review Panel")}</CardTitle>
                <CardDescription>{translate("AI prescriptions pending vet verification")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{translate("AI Prescription #001")}</p>
                        <p className="text-sm text-muted-foreground">{translate("Submitted 2 hours ago")}</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {translate("Pending Review")}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">
                      <strong>{translate("Recommendation")}</strong>: Amoxicillin 500mg,{" "}
                      {translate("twice daily for 5 days")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{translate("Reason")}</strong>: {translate("Respiratory infection symptoms")}
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{translate("AI Prescription #002")}</p>
                        <p className="text-sm text-muted-foreground">{translate("Verified by Dr. Smith")}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {translate("Approved")}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">
                      <strong>{translate("Final Prescription")}</strong>: Penicillin 300mg,{" "}
                      {translate("once daily for 3 days")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{translate("Vet Notes")}</strong>:{" "}
                      {translate("Reduced dosage recommended due to animal weight")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "bio-credit" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{translate("Bio-Credit Wallet")}</h1>
              <p className="text-muted-foreground">{translate("Earn and trade credits for sustainable practices")}</p>
            </div>

            {/* Wallet Balance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Current Balance")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold text-primary">1,247</span>
                    <span className="text-sm text-muted-foreground">{translate("credits")}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{translate("+156 this month")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Credits Earned")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">2,890</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{translate("Total lifetime earnings")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{translate("Market Value")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold">₹18,705</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{translate("@ ₹15 per credit")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Credit Earning Activities */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Credit Earning Activities")}</CardTitle>
                <CardDescription>{translate("How you earn bio-credits for sustainable practices")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{translate("AMU Below Baseline")}</p>
                      <p className="text-sm text-green-600">{translate("36% reduction from target")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+50</p>
                      <p className="text-xs text-green-500">{translate("credits/month")}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">{translate("Organic Feed Usage")}</p>
                      <p className="text-sm text-blue-600">{translate("85% organic feed this month")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">+30</p>
                      <p className="text-xs text-blue-500">{translate("credits/month")}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-800">{translate("Preventive Care")}</p>
                      <p className="text-sm text-purple-600">{translate("Regular health monitoring")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">+25</p>
                      <p className="text-xs text-purple-500">{translate("credits/month")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Options */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Trading Options")}</CardTitle>
                <CardDescription>{translate("Sell your bio-credits in the marketplace")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{translate("Instant Sale")}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {translate("Sell immediately at current market rate")}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span>{translate("Rate: ₹15/credit")}</span>
                      <span className="text-green-600">{translate("Available now")}</span>
                    </div>
                    <Button className="w-full">{translate("Sell Credits")}</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{translate("Future Contract")}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {translate("Lock in higher rates for future delivery")}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span>{translate("Rate: ₹18/credit")}</span>
                      <span className="text-blue-600">{translate("30-day contract")}</span>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      {translate("Create Contract")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "subsidies" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{translate("Govt Subsidies")}</h1>
              <p className="text-muted-foreground">{translate("Available subsidies and eligibility status")}</p>
            </div>

            {/* Subsidy Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Recommended Subsidies")}</CardTitle>
                <CardDescription>{translate("AI-recommended subsidies based on your profile")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subsidies.map((subsidy, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{translate(subsidy.title)}</h4>
                          <p className="text-lg font-bold text-primary">{subsidy.amount}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            subsidy.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : subsidy.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {subsidy.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {subsidy.status === "pending" && <Calendar className="h-3 w-3 mr-1" />}
                          {subsidy.status === "available" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {translate(subsidy.status.charAt(0).toUpperCase() + subsidy.status.slice(1))}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          {translate(subsidy.eligibility)}
                        </Badge>
                        <Button
                          size="sm"
                          variant={subsidy.status === "available" ? "default" : "outline"}
                          disabled={subsidy.status === "approved"}
                        >
                          {subsidy.status === "approved"
                            ? translate("Approved")
                            : subsidy.status === "pending"
                              ? translate("View Status")
                              : translate("Apply Now")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Checker */}
            <Card>
              <CardHeader>
                <CardTitle>{translate("Eligibility Checker")}</CardTitle>
                <CardDescription>{translate("Check your eligibility for additional subsidies")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">{translate("Farm Size")}</span>
                      <Badge variant="outline" className="text-green-700">
                        ✓ {translate("5+ acres")}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{translate("Livestock Count")}</span>
                      <Badge variant="outline" className="text-green-700">
                        ✓ {translate("10+ animals")}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{translate("AMU Compliance")}</span>
                      <Badge variant="outline" className="text-green-700">
                        ✓ {translate("A+ Grade")}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{translate("Organic Certification")}</span>
                      <Badge variant="outline" className="text-yellow-700">
                        ⚠ {translate("Pending")}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">{translate("Check New Subsidies")}</Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      {translate("Download Eligibility Report")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={showMediaUpload} onOpenChange={setShowMediaUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{translate("Upload Evidence")}</DialogTitle>
            <DialogDescription>
              {translate("Upload photo or video evidence of medicine administration")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col bg-transparent">
                <Camera className="h-6 w-6 mb-2" />
                {translate("Take Photo")}
              </Button>
              <Button variant="outline" className="h-24 flex-col bg-transparent">
                <Video className="h-6 w-6 mb-2" />
                {translate("Record Video")}
              </Button>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{translate("Or drag and drop files here")}</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">{translate("Upload Evidence")}</Button>
              <Button variant="outline" onClick={() => setShowMediaUpload(false)}>
                {translate("Cancel")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
