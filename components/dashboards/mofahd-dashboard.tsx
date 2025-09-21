"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/lib/language"
import {
  LogOut,
  TrendingDown,
  TrendingUp,
  Users,
  MapPin,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download,
  Filter,
  Map,
  Trophy,
  CreditCard,
  UserCheck,
  Lightbulb,
  DollarSign,
  Bell,
  Target,
  Zap,
  Globe,
  Star,
  TrendingUpIcon as TrendingRight,
  Activity,
  Shield,
  Coins,
  Eye,
  Calendar,
  Flag,
  FileText,
  Search,
} from "lucide-react"
import { RoleBasedNav } from "@/components/navigation/role-based-nav"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const amuTrendsData = [
  { month: "Jan", national: 4.2, target: 5.0, reduction: 16 },
  { month: "Feb", national: 4.0, target: 5.0, reduction: 20 },
  { month: "Mar", national: 3.8, target: 5.0, reduction: 24 },
  { month: "Apr", national: 3.5, target: 5.0, reduction: 30 },
  { month: "May", national: 3.2, target: 5.0, reduction: 36 },
  { month: "Jun", national: 2.9, target: 5.0, reduction: 42 },
]

const districtLeaderboard = [
  {
    rank: 1,
    district: "Pune",
    state: "Maharashtra",
    amuRate: 2.1,
    reduction: 58,
    farmers: 1250,
    grade: "A+",
    credits: 15420,
  },
  {
    rank: 2,
    district: "Ludhiana",
    state: "Punjab",
    amuRate: 2.3,
    reduction: 54,
    farmers: 980,
    grade: "A+",
    credits: 14200,
  },
  {
    rank: 3,
    district: "Anand",
    state: "Gujarat",
    amuRate: 2.5,
    reduction: 50,
    farmers: 1100,
    grade: "A",
    credits: 13800,
  },
  {
    rank: 4,
    district: "Erode",
    state: "Tamil Nadu",
    amuRate: 2.8,
    reduction: 44,
    farmers: 850,
    grade: "A",
    credits: 12500,
  },
  {
    rank: 5,
    district: "Hisar",
    state: "Haryana",
    amuRate: 3.1,
    reduction: 38,
    farmers: 720,
    grade: "B+",
    credits: 11200,
  },
]

const highRiskDistricts = [
  { district: "Jaipur", state: "Rajasthan", amuRate: 6.8, increase: 12, farmers: 920, riskLevel: "Critical" },
  { district: "Belgaum", state: "Karnataka", amuRate: 6.2, increase: 8, farmers: 650, riskLevel: "High" },
  { district: "Nashik", state: "Maharashtra", amuRate: 5.9, increase: 5, farmers: 580, riskLevel: "High" },
  { district: "Indore", state: "Madhya Pradesh", amuRate: 5.7, increase: 3, farmers: 740, riskLevel: "Moderate" },
]

const creditEconomyData = {
  totalIssued: 2450000,
  totalTraded: 1850000,
  totalRedeemed: 1200000,
  activeCredits: 1250000,
  monthlyGrowth: 15.2,
  exportBenefit: 45000000,
}

const topCreditFarmers = [
  { name: "Rajesh Kumar", location: "Pune, Maharashtra", credits: 2450, earnings: 98000, livestock: "Dairy Cattle" },
  { name: "Suresh Patel", location: "Anand, Gujarat", credits: 2200, earnings: 88000, livestock: "Buffalo" },
  { name: "Manjeet Singh", location: "Ludhiana, Punjab", credits: 2100, earnings: 84000, livestock: "Poultry" },
  { name: "Ravi Sharma", location: "Hisar, Haryana", credits: 1950, earnings: 78000, livestock: "Goat" },
]

const vetLeaderboard = [
  {
    rank: 1,
    name: "Dr. Priya Sharma",
    location: "Maharashtra",
    prescriptions: 1250,
    mrlTests: 450,
    farmers: 320,
    rating: 4.9,
  },
  {
    rank: 2,
    name: "Dr. Amit Patel",
    location: "Gujarat",
    prescriptions: 1180,
    mrlTests: 420,
    farmers: 290,
    rating: 4.8,
  },
  {
    rank: 3,
    name: "Dr. Rajesh Kumar",
    location: "Punjab",
    prescriptions: 1120,
    mrlTests: 380,
    farmers: 275,
    rating: 4.8,
  },
  {
    rank: 4,
    name: "Dr. Sunita Reddy",
    location: "Tamil Nadu",
    prescriptions: 1050,
    mrlTests: 350,
    farmers: 250,
    rating: 4.7,
  },
]

const policyInsights = [
  {
    insight: "Andhra Pradesh poultry farms using 20% above national average antibiotics",
    severity: "High",
    recommendation: "Implement targeted training programs for poultry farmers",
    impact: "Potential 15% reduction in AMU",
    timeline: "3 months",
  },
  {
    insight: "Maharashtra dairy sector shows 35% improvement in compliance",
    severity: "Positive",
    recommendation: "Replicate Maharashtra model in Karnataka and Tamil Nadu",
    impact: "Expected 25% improvement",
    timeline: "6 months",
  },
  {
    insight: "Northern states lag behind in MRL test adoption",
    severity: "Medium",
    recommendation: "Increase mobile testing units and subsidies",
    impact: "Improve test coverage by 40%",
    timeline: "4 months",
  },
]

const subsidyData = [
  { name: "Organic Feed Subsidy", claimed: 8500, budget: 10000, impact: "High AMU Reduction", adoption: 85 },
  { name: "MRL Testing Support", claimed: 6200, budget: 8000, impact: "Compliance Improvement", adoption: 77.5 },
  { name: "Vet Consultation Credits", claimed: 4800, budget: 6000, impact: "Better Prescriptions", adoption: 80 },
  { name: "Bio-Credit Bonus", claimed: 3200, budget: 5000, impact: "Farmer Engagement", adoption: 64 },
]

const mapData = [
  { state: "Maharashtra", amuIntensity: "Low", compliance: 85, districts: 36, color: "#22c55e" },
  { state: "Punjab", amuIntensity: "Low", compliance: 92, districts: 22, color: "#22c55e" },
  { state: "Gujarat", amuIntensity: "Medium", compliance: 88, districts: 33, color: "#eab308" },
  { state: "Tamil Nadu", amuIntensity: "Medium", compliance: 82, districts: 38, color: "#eab308" },
  { state: "Rajasthan", amuIntensity: "High", compliance: 65, districts: 33, color: "#ef4444" },
  { state: "Karnataka", amuIntensity: "High", compliance: 70, districts: 30, color: "#ef4444" },
]

const indiaMapData = [
  { state: "Maharashtra", compliance: 85, color: "#22c55e", coordinates: [75.7139, 19.7515] },
  { state: "Punjab", compliance: 92, color: "#22c55e", coordinates: [75.3412, 31.1471] },
  { state: "Gujarat", compliance: 88, color: "#22c55e", coordinates: [71.1924, 22.2587] },
  { state: "Tamil Nadu", compliance: 82, color: "#eab308", coordinates: [78.6569, 11.1271] },
  { state: "Rajasthan", compliance: 65, color: "#ef4444", coordinates: [74.2179, 27.0238] },
  { state: "Karnataka", compliance: 70, color: "#ef4444", coordinates: [75.7139, 15.3173] },
  { state: "Uttar Pradesh", compliance: 78, color: "#eab308", coordinates: [80.9462, 26.8467] },
  { state: "West Bengal", compliance: 74, color: "#eab308", coordinates: [87.855, 22.9868] },
  { state: "Haryana", compliance: 89, color: "#22c55e", coordinates: [76.0856, 29.0588] },
  { state: "Kerala", compliance: 91, color: "#22c55e", coordinates: [76.2711, 10.8505] },
]

const getComplianceColor = (compliance: number) => {
  if (compliance >= 90) return "#22c55e" // Green
  if (compliance >= 80) return "#eab308" // Yellow
  return "#ef4444" // Red
}

export function MofahdDashboard() {
  const { user } = useAuth()
  const { translate } = useLanguage()
  const [selectedState, setSelectedState] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [activeView, setActiveView] = useState("map")
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedMapState, setSelectedMapState] = useState<string | null>(null)

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800 border-green-200"
      case "A":
        return "bg-green-100 text-green-700 border-green-200"
      case "B+":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "B":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "C":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <RoleBasedNav
        activeSection={activeView}
        onSectionChange={setActiveView}
        className="fixed left-0 top-0 h-full z-10"
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{translate("MoFAHD Admin Dashboard")}</h1>
              <p className="text-muted-foreground">
                {translate("Ministry of Fisheries, Animal Husbandry & Dairying - Analytics & Compliance")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                {translate("Export Report")}
              </Button>
              <Button onClick={() => user.logout()} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                {translate("Sign Out")}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">{translate("Filters:")}</span>
                </div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{translate("All States")}</SelectItem>
                    <SelectItem value="maharashtra">{translate("Maharashtra")}</SelectItem>
                    <SelectItem value="punjab">{translate("Punjab")}</SelectItem>
                    <SelectItem value="gujarat">{translate("Gujarat")}</SelectItem>
                    <SelectItem value="tamilnadu">{translate("Tamil Nadu")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">{translate("Last Month")}</SelectItem>
                    <SelectItem value="3months">{translate("Last 3 Months")}</SelectItem>
                    <SelectItem value="6months">{translate("Last 6 Months")}</SelectItem>
                    <SelectItem value="1year">{translate("Last Year")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{translate("National AMU Rate")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">2.9</span>
                  <span className="text-sm text-muted-foreground">mg/kg</span>
                </div>
                <p className="text-xs text-green-600 mt-1">↓ 42% from baseline</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{translate("Total Farmers")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-2xl font-bold">125,420</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">+2,340 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{translate("Active Vets")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-purple-600" />
                  <span className="text-2xl font-bold">3,240</span>
                </div>
                <p className="text-xs text-purple-600 mt-1">98% availability</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{translate("Compliance Rate")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">84%</span>
                </div>
                <p className="text-xs text-green-600 mt-1">+5% from last quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeView === "map" ? "default" : "outline"}
              onClick={() => setActiveView("map")}
              size="sm"
            >
              <Map className="h-4 w-4 mr-2" />
              {translate("AMU/MRL Map")}
            </Button>
            <Button
              variant={activeView === "leaderboard" ? "default" : "outline"}
              onClick={() => setActiveView("leaderboard")}
              size="sm"
            >
              <Trophy className="h-4 w-4 mr-2" />
              {translate("Leaderboard")}
            </Button>
            <Button
              variant={activeView === "credits" ? "default" : "outline"}
              onClick={() => setActiveView("credits")}
              size="sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {translate("Credits")}
            </Button>
            <Button
              variant={activeView === "vets" ? "default" : "outline"}
              onClick={() => setActiveView("vets")}
              size="sm"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              {translate("Vets")}
            </Button>
            <Button
              variant={activeView === "insights" ? "default" : "outline"}
              onClick={() => setActiveView("insights")}
              size="sm"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {translate("Policy Insights")}
            </Button>
            <Button
              variant={activeView === "subsidies" ? "default" : "outline"}
              onClick={() => setActiveView("subsidies")}
              size="sm"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              {translate("Subsidies")}
            </Button>
            <Button
              variant={activeView === "alerts" ? "default" : "outline"}
              onClick={() => setActiveView("alerts")}
              size="sm"
            >
              <Bell className="h-4 w-4 mr-2" />
              {translate("Alerts")}
            </Button>
            <Button
              variant={activeView === "audit-queue" ? "default" : "outline"}
              onClick={() => setActiveView("audit-queue")}
              size="sm"
            >
              <Flag className="h-4 w-4 mr-2" />
              {translate("Audit Queue")}
            </Button>
            <Button
              variant={activeView === "purchase-records" ? "default" : "outline"}
              onClick={() => setActiveView("purchase-records")}
              size="sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              {translate("Purchase Records")}
            </Button>
          </div>

          {activeView === "map" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("National AMU Rate")}</p>
                        <p className="text-2xl font-bold text-green-600">2.9 mg/kg</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          42% below target
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("MRL Pass Rate")}</p>
                        <p className="text-2xl font-bold text-green-600">95%</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          +5% improvement
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Active Districts")}</p>
                        <p className="text-2xl font-bold">245</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1" />
                          Across 28 states
                        </p>
                      </div>
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Compliance Issues")}</p>
                        <p className="text-2xl font-bold text-orange-600">34</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Requires attention
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interactive Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>{translate("India AMU Intensity Map")}</CardTitle>
                  <CardDescription>{translate("Click on states to drill down to district level data")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border">
                        <ComposableMap
                          projection="geoMercator"
                          projectionConfig={{
                            scale: 1000,
                            center: [78.9629, 20.5937],
                          }}
                          width={800}
                          height={400}
                          className="w-full h-full"
                        >
                          <Geographies geography="/india-states.json">
                            {({ geographies }) =>
                              geographies.map((geo) => {
                                const stateName = geo.properties.NAME_1
                                const stateData = indiaMapData.find((s) => s.state === stateName)
                                const compliance = stateData?.compliance || 75
                                const fillColor = getComplianceColor(compliance)

                                return (
                                  <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={fillColor}
                                    stroke="#FFFFFF"
                                    strokeWidth={0.5}
                                    style={{
                                      default: { outline: "none" },
                                      hover: {
                                        outline: "none",
                                        fill: fillColor,
                                        opacity: 0.8,
                                        cursor: "pointer",
                                      },
                                      pressed: { outline: "none" },
                                    }}
                                    onMouseEnter={() => setHoveredState(stateName)}
                                    onMouseLeave={() => setHoveredState(null)}
                                    onClick={() => setSelectedMapState(stateName)}
                                  />
                                )
                              })
                            }
                          </Geographies>

                          {/* State markers for better interaction */}
                          {indiaMapData.map((state) => (
                            <Marker key={state.state} coordinates={state.coordinates}>
                              <circle
                                r={4}
                                fill={state.color}
                                stroke="#fff"
                                strokeWidth={1}
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedMapState(state.state)}
                              />
                            </Marker>
                          ))}
                        </ComposableMap>

                        {/* Tooltip */}
                        {hoveredState && (
                          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border z-10">
                            <p className="font-medium">{hoveredState}</p>
                            <p className="text-sm text-muted-foreground">
                              {translate("Compliance")}:{" "}
                              {indiaMapData.find((s) => s.state === hoveredState)?.compliance || 75}%
                            </p>
                          </div>
                        )}

                        {/* Legend */}
                        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
                          <p className="text-sm font-medium mb-2">{translate("Compliance Rate")}</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <div className="w-3 h-3 bg-green-500 rounded"></div>
                              <span>{translate(">90% - Low AMU")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                              <span>{translate("80-90% - Medium AMU")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <div className="w-3 h-3 bg-red-500 rounded"></div>
                              <span>{translate("<80% - High AMU")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">{translate("State Overview")}</h4>
                      {indiaMapData.map((state) => (
                        <div
                          key={state.state}
                          className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedMapState === state.state ? "bg-blue-50 border-blue-200" : ""
                          }`}
                          onClick={() => setSelectedMapState(state.state)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.color }}></div>
                            <div>
                              <p className="font-medium">{translate(state.state)}</p>
                              <p className="text-sm text-muted-foreground">
                                {mapData.find((s) => s.state === state.state)?.districts || 25} {translate("districts")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{state.compliance}%</p>
                            <p className="text-xs text-muted-foreground">{translate("Compliance")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected State Details */}
                  {selectedMapState && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        {translate(selectedMapState)} - {translate("Detailed View")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {indiaMapData.find((s) => s.state === selectedMapState)?.compliance}%
                          </p>
                          <p className="text-sm text-blue-600">{translate("Compliance Rate")}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">2.1</p>
                          <p className="text-sm text-green-600">AMU Rate (mg/kg)</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">1,250</p>
                          <p className="text-sm text-purple-600">{translate("Active Farmers")}</p>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3" onClick={() => setSelectedMapState(null)}>
                        {translate("View District Details")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "leaderboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Districts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      {translate("Top 10 Antibiotic-Smart Districts")}
                    </CardTitle>
                    <CardDescription>{translate("Lowest AMU rates with highest compliance")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {districtLeaderboard.map((district) => (
                        <div
                          key={district.rank}
                          className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white font-bold text-sm">
                              {district.rank}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{district.district}</h4>
                                <Badge variant="outline" className={getGradeColor(district.grade)}>
                                  {district.grade}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{district.state}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{district.amuRate} mg/kg</p>
                            <p className="text-sm text-blue-600">{district.credits} credits</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* High-Risk Districts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      {translate("High-Risk Districts")}
                    </CardTitle>
                    <CardDescription>{translate("Districts requiring immediate intervention")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {highRiskDistricts.map((district, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-red-50 to-orange-50"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{district.district}</h4>
                              <Badge variant="destructive" className="text-xs">
                                {district.riskLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{district.state}</p>
                            <p className="text-sm text-red-600">+{district.increase}% increase</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-600">{district.amuRate} mg/kg</p>
                            <p className="text-sm text-muted-foreground">{district.farmers} farmers</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeView === "credits" && (
            <div className="space-y-6">
              {/* Credit Economy Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Total Credits Issued")}</p>
                        <p className="text-2xl font-bold">2.45M</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15.2% this month
                        </p>
                      </div>
                      <Coins className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Credits Traded")}</p>
                        <p className="text-2xl font-bold">1.85M</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <Activity className="h-3 w-3 mr-1" />
                          Active market
                        </p>
                      </div>
                      <TrendingRight className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Export Benefits")}</p>
                        <p className="text-2xl font-bold">₹45M</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1" />
                          From reduced AMU
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{translate("Active Credits")}</p>
                        <p className="text-2xl font-bold">1.25M</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <Shield className="h-3 w-3 mr-1" />
                          In circulation
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Credit Earning Farmers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    {translate("Top Credit-Earning Farmers")}
                  </CardTitle>
                  <CardDescription>{translate("Farmers leading in bio-credit generation")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCreditFarmers.map((farmer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-green-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{farmer.name}</h4>
                            <p className="text-sm text-muted-foreground">{farmer.location}</p>
                            <p className="text-sm text-blue-600">{farmer.livestock}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{farmer.credits} credits</p>
                          <p className="text-sm text-muted-foreground">₹{farmer.earnings.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "vets" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-500" />
                    {translate("Veterinarian Performance Leaderboard")}
                  </CardTitle>
                  <CardDescription>
                    {translate("Top performing vets by prescriptions verified and farmer support")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vetLeaderboard.map((vet) => (
                      <div
                        key={vet.rank}
                        className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-green-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                            {vet.rank}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{vet.name}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{vet.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{vet.location}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <p className="text-lg font-bold text-blue-600">{vet.prescriptions}</p>
                            <p className="text-xs text-muted-foreground">{translate("Prescriptions")}</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">{vet.mrlTests}</p>
                            <p className="text-xs text-muted-foreground">{translate("MRL Tests")}</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-600">{vet.farmers}</p>
                            <p className="text-xs text-muted-foreground">{translate("Farmers")}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "insights" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    {translate("AI-Generated Policy Insights")}
                  </CardTitle>
                  <CardDescription>{translate("Data-driven recommendations for policy interventions")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policyInsights.map((insight, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium mb-2">{insight.insight}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{insight.recommendation}</p>
                            </div>
                            <Badge
                              variant={
                                insight.severity === "High"
                                  ? "destructive"
                                  : insight.severity === "Positive"
                                    ? "default"
                                    : "secondary"
                              }
                              className="ml-4"
                            >
                              {insight.severity}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-green-600" />
                              <span className="text-green-600 font-medium">Impact: {insight.impact}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-600 font-medium">Timeline: {insight.timeline}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "subsidies" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    {translate("Subsidy Impact Analysis")}
                  </CardTitle>
                  <CardDescription>
                    {translate("Correlation between subsidy adoption and AMU reduction")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subsidyData.map((subsidy, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{subsidy.name}</h4>
                            <p className="text-sm text-muted-foreground">{subsidy.impact}</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {subsidy.adoption}% Adoption
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              {translate("Claimed")}: {subsidy.claimed.toLocaleString()}
                            </span>
                            <span>
                              {translate("Budget")}: {subsidy.budget.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(subsidy.claimed / subsidy.budget) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "alerts" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      {translate("Critical Alerts")}
                    </CardTitle>
                    <CardDescription>{translate("Urgent interventions required")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-800">{translate("Jaipur AMU Spike")}</p>
                            <p className="text-sm text-red-600">68% above national average</p>
                          </div>
                        </div>
                        <Button size="sm" variant="destructive">
                          <Eye className="h-4 w-4 mr-1" />
                          {translate("View")}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-orange-800">{translate("Karnataka MRL Failures")}</p>
                            <p className="text-sm text-orange-600">15 consecutive failures</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          {translate("View")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      {translate("Recent Notifications")}
                    </CardTitle>
                    <CardDescription>{translate("System updates and achievements")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">{translate("Maharashtra Achievement")}</p>
                          <p className="text-sm text-green-600">Reached 35% AMU reduction target</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">{translate("System Update")}</p>
                          <p className="text-sm text-blue-600">New MRL testing protocols deployed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeView === "audit-queue" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{translate("Audit Queue")}</h2>
                  <p className="text-muted-foreground">{translate("Review flagged events across all farmers")}</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {translate("Request Evidence to All")}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{translate("Flagged Events Requiring Review")}</CardTitle>
                  <CardDescription>{translate("Critical issues detected across the platform")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">Farmer: Rajesh Kumar (ID: F001)</p>
                            <Badge variant="destructive">{translate("High Priority")}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Animal A001 - Tetracycline - 2024-01-10</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Flag className="h-2 w-2 mr-1" />
                            {translate("purchase vs usage mismatch")}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm mb-3 p-2 bg-white rounded">
                        <strong>{translate("Issue:")}</strong>{" "}
                        {translate("Purchased 10 doses, logged 15 doses - potential over-reporting")}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          {translate("Request Evidence")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          {translate("Send to Vet")}
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Flag className="h-3 w-3 mr-1" />
                          {translate("Flag for Investigation")}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">Farmer: Suresh Patel (ID: F002)</p>
                            <Badge variant="secondary">{translate("Medium Priority")}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Animal A002 - Amoxicillin - 2024-01-08</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Flag className="h-2 w-2 mr-1" />
                            {translate("missing media")}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm mb-3 p-2 bg-white rounded">
                        <strong>{translate("Issue:")}</strong> {translate("No photo evidence provided after 24 hours")}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          {translate("Request Evidence")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          {translate("Send to Vet")}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">Farmer: Manjeet Singh (ID: F003)</p>
                            <Badge variant="destructive">{translate("High Priority")}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Animal A001 - Penicillin - 2024-01-05</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Flag className="h-2 w-2 mr-1" />
                            {translate("rapid repeat dosing")}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm mb-3 p-2 bg-white rounded">
                        <strong>{translate("Issue:")}</strong>{" "}
                        {translate("3 doses administered within 2 days - potential overdosing")}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          {translate("Request Evidence")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          {translate("Send to Vet")}
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Flag className="h-3 w-3 mr-1" />
                          {translate("Flag for Investigation")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === "purchase-records" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{translate("Purchase Records Verification")}</h2>
                <p className="text-muted-foreground">{translate("Cross-check invoices against farmer usage logs")}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{translate("Invoice Search & Verification")}</CardTitle>
                  <CardDescription>
                    {translate("Search for specific invoices and compare with usage logs")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="invoice-search">{translate("Search Invoice")}</Label>
                      <Input
                        id="invoice-search"
                        placeholder={translate("Enter invoice number, farmer ID, or medicine name...")}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        {translate("Search")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">Invoice #INV-2024-001</p>
                          <p className="text-sm text-muted-foreground">Farmer: Rajesh Kumar (F001) - 2024-01-08</p>
                        </div>
                        <Badge variant="destructive">{translate("Mismatch Detected")}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">{translate("Purchase Record")}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>{translate("Medicine:")}</span>
                              <span>Tetracycline</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Quantity:")}</span>
                              <span className="font-medium">10 doses</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Date:")}</span>
                              <span>2024-01-08</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-2">{translate("Usage Logs")}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>{translate("Medicine:")}</span>
                              <span>Tetracycline</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Logged Usage:")}</span>
                              <span className="font-medium text-red-600">15 doses</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Period:")}</span>
                              <span>2024-01-08 to 2024-01-12</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-red-50 rounded-lg mb-3">
                        <p className="text-sm text-red-800">
                          <strong>{translate("Discrepancy:")}</strong>{" "}
                          {translate(
                            "Farmer logged 5 more doses than purchased. This indicates potential over-reporting or unreported purchases.",
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          {translate("Request Additional Invoices")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {translate("Flag for Audit")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          {translate("View Details")}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">Invoice #INV-2024-002</p>
                          <p className="text-sm text-muted-foreground">Farmer: Suresh Patel (F002) - 2024-01-05</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {translate("Verified")}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">{translate("Purchase Record")}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>{translate("Medicine:")}</span>
                              <span>Amoxicillin</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Quantity:")}</span>
                              <span className="font-medium">8 doses</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Date:")}</span>
                              <span>2024-01-05</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">{translate("Usage Logs")}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>{translate("Medicine:")}</span>
                              <span>Amoxicillin</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Logged Usage:")}</span>
                              <span className="font-medium text-green-600">7 doses</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{translate("Period:")}</span>
                              <span>2024-01-05 to 2024-01-10</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg mb-3">
                        <p className="text-sm text-green-800">
                          <strong>{translate("Status:")}</strong>{" "}
                          {translate(
                            "Purchase and usage records match within acceptable range. 1 dose remaining in inventory.",
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {translate("Mark as Verified")}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          {translate("View Details")}
                        </Button>
                      </div>
                    </div>
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
