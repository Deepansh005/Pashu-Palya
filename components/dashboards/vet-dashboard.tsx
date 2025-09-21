"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { RoleBasedNav } from "@/components/navigation/role-based-nav"
import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  TestTube,
  MapPin,
  Phone,
  Star,
  MessageSquare,
  Send,
  Bot,
  TrendingUp,
  Users,
  Award,
  Activity,
  BarChart3,
  MessageCircle,
} from "lucide-react"

const prescriptionRequests = [
  {
    id: "PR001",
    farmerId: "F001",
    farmerName: "Rajesh Kumar",
    farmerContact: "+91 98765 43210",
    animalId: "A001",
    animalType: "Cow",
    symptoms: "Animal showing signs of lethargy, reduced appetite, slight fever. Temperature recorded at 102°F.",
    aiRecommendation: "Amoxicillin 500mg, twice daily for 5 days",
    aiConfidence: 85,
    submittedAt: "2024-01-15 14:30",
    status: "pending",
    priority: "medium",
    hasMessages: true,
    lastMessage: "Farmer added: Animal condition seems to be worsening",
  },
  {
    id: "PR002",
    farmerId: "F002",
    farmerName: "Priya Sharma",
    farmerContact: "+91 87654 32109",
    animalId: "A045",
    animalType: "Buffalo",
    symptoms: "Respiratory distress, coughing, nasal discharge. Animal appears uncomfortable.",
    aiRecommendation: "Penicillin 300mg, once daily for 7 days + Bronchodilator",
    aiConfidence: 92,
    submittedAt: "2024-01-15 16:45",
    status: "pending",
    priority: "high",
    hasMessages: false,
  },
  {
    id: "PR003",
    farmerId: "F003",
    farmerName: "Suresh Patel",
    farmerContact: "+91 76543 21098",
    animalId: "A023",
    animalType: "Goat",
    symptoms: "Minor wound on leg, showing signs of infection. Swelling and redness observed.",
    aiRecommendation: "Topical antibiotic cream + Tetracycline 250mg daily for 3 days",
    aiConfidence: 78,
    submittedAt: "2024-01-14 11:20",
    status: "reviewed",
    priority: "low",
    vetNotes: "Approved with reduced dosage due to animal weight. Monitor for 48 hours.",
    reviewedAt: "2024-01-14 15:30",
    hasMessages: false,
  },
]

const aiConversations = [
  {
    id: 1,
    question: "What is the withdrawal period for Amoxicillin in dairy cows?",
    answer:
      "The withdrawal period for Amoxicillin in dairy cows is typically 48-72 hours for milk and 28 days for meat. However, this can vary based on the specific formulation and dosage. Always refer to the product label for exact withdrawal times.",
    timestamp: "2024-01-15 10:30",
  },
  {
    id: 2,
    question: "Safe dosage range for Penicillin in buffalo calves?",
    answer:
      "For buffalo calves, Penicillin dosage is typically 10,000-20,000 IU per kg body weight, administered intramuscularly every 12-24 hours. For calves under 6 months, use the lower end of the range. Always consider the animal's weight and condition.",
    timestamp: "2024-01-15 09:15",
  },
]

const farmerAnalytics = [
  {
    farmerId: "F001",
    farmerName: "Rajesh Kumar",
    totalAnimals: 25,
    amuUsage: "High",
    lastTreatment: "2024-01-10",
    complianceScore: 78,
    flagged: true,
  },
  {
    farmerId: "F002",
    farmerName: "Priya Sharma",
    totalAnimals: 18,
    amuUsage: "Normal",
    lastTreatment: "2024-01-08",
    complianceScore: 92,
    flagged: false,
  },
  {
    farmerId: "F003",
    farmerName: "Suresh Patel",
    totalAnimals: 12,
    amuUsage: "Low",
    lastTreatment: "2024-01-05",
    complianceScore: 95,
    flagged: false,
  },
]

// Mock data for MRL tests
const mrlTests = [
  {
    id: "MRL001",
    farmerId: "F001",
    farmerName: "Rajesh Kumar",
    animalId: "A001",
    testType: "Milk Residue",
    scheduledDate: "2024-01-20",
    status: "scheduled",
    location: "Farm Location A",
    contact: "+91 98765 43210",
  },
  {
    id: "MRL002",
    farmerId: "F004",
    farmerName: "Meera Singh",
    animalId: "A067",
    testType: "Meat Residue",
    scheduledDate: "2024-01-18",
    status: "completed",
    result: "Pass",
    location: "Farm Location B",
    contact: "+91 65432 10987",
  },
  {
    id: "MRL003",
    farmerId: "F005",
    farmerName: "Anil Verma",
    animalId: "A089",
    testType: "Milk Residue",
    scheduledDate: "2024-01-22",
    status: "pending",
    location: "Farm Location C",
    contact: "+91 54321 09876",
  },
]

export function VetDashboard() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("reviews")
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [vetNotes, setVetNotes] = useState("")
  const [prescriptionDecision, setPrescriptionDecision] = useState<"approve" | "modify" | "reject" | null>(null)
  const [modifiedPrescription, setModifiedPrescription] = useState("")
  const [newTestDate, setNewTestDate] = useState("")
  const [newTestType, setNewTestType] = useState("")
  const [aiQuestion, setAiQuestion] = useState("")
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; message: string; sender: "farmer" | "vet"; timestamp: string }>
  >([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedFarmerChat, setSelectedFarmerChat] = useState<string | null>(null)
  const [vetReputation, setVetReputation] = useState(4.8)
  const [totalReviews, setTotalReviews] = useState(247)

  const handlePrescriptionReview = (requestId: string, decision: "approve" | "modify" | "reject") => {
    // Mock review submission with reputation update
    if (decision === "approve") {
      setVetReputation((prev) => Math.min(5.0, prev + 0.01))
      setTotalReviews((prev) => prev + 1)
    }
    alert(`Prescription ${decision}d for request ${requestId}`)
    setSelectedRequest(null)
    setVetNotes("")
    setPrescriptionDecision(null)
    setModifiedPrescription("")
  }

  const handleAiQuestion = () => {
    if (!aiQuestion.trim()) return

    // Mock AI response
    const mockResponse =
      "Based on current veterinary guidelines, I recommend consulting the latest drug compendium for specific withdrawal periods and dosage information. Would you like me to provide more specific guidance?"

    alert(`AI Response: ${mockResponse}`)
    setAiQuestion("")
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFarmerChat) return

    const message = {
      id: Date.now().toString(),
      message: newMessage,
      sender: "vet" as const,
      timestamp: new Date().toLocaleTimeString(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleScheduleMRLTest = (farmerId: string) => {
    // Mock MRL test scheduling
    alert(`MRL test scheduled for farmer ${farmerId} on ${newTestDate}`)
    setNewTestDate("")
    setNewTestType("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <RoleBasedNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        className="fixed left-0 top-0 h-full z-10"
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">
                {activeSection === "reviews" && "Prescription Reviews"}
                {activeSection === "mrl-tests" && "MRL Test Management"}
                {activeSection === "ai-assistant" && "AI Assistant"}
                {activeSection === "analytics" && "Analytics & Alerts"}
                {activeSection === "communication" && "Farmer Communication"}
              </h1>
              <p className="text-muted-foreground">Welcome, Dr. {user?.name}</p>
            </div>

            {/* Vet Reputation Display */}
            <Card className="w-64">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Your Reputation</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">{vetReputation.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({totalReviews} reviews)</span>
                    </div>
                  </div>
                  <Award className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {activeSection === "ai-assistant" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Query Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Veterinary Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about drug guidelines, withdrawal periods, and dosages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-question">Ask a Question</Label>
                    <Textarea
                      id="ai-question"
                      placeholder="e.g., What is the withdrawal period for Oxytetracycline in goats?"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAiQuestion} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                </CardContent>
              </Card>

              {/* Recent AI Conversations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent AI Conversations</CardTitle>
                  <CardDescription>Your previous queries and responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiConversations.map((conversation) => (
                      <div key={conversation.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-1 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{conversation.question}</p>
                            <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 ml-6">
                          <Bot className="h-4 w-4 mt-1 text-green-600" />
                          <p className="text-sm text-muted-foreground">{conversation.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "analytics" && (
            <div className="space-y-6">
              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">AMU Trend</p>
                        <p className="text-2xl font-bold text-blue-600">-12%</p>
                        <p className="text-xs text-muted-foreground">vs last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Active Farmers</p>
                        <p className="text-2xl font-bold text-green-600">23</p>
                        <p className="text-xs text-muted-foreground">under your care</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">High AMU Alerts</p>
                        <p className="text-2xl font-bold text-red-600">3</p>
                        <p className="text-xs text-muted-foreground">require attention</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Avg Compliance</p>
                        <p className="text-2xl font-bold text-purple-600">88%</p>
                        <p className="text-xs text-muted-foreground">across all farmers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farmer Monitoring Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Farmer AMU Monitoring
                  </CardTitle>
                  <CardDescription>Track antimicrobial usage patterns and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {farmerAnalytics.map((farmer) => (
                      <div key={farmer.farmerId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{farmer.farmerName}</p>
                            <p className="text-sm text-muted-foreground">{farmer.totalAnimals} animals</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              farmer.amuUsage === "High"
                                ? "border-red-200 text-red-700"
                                : farmer.amuUsage === "Normal"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-green-200 text-green-700"
                            }
                          >
                            {farmer.amuUsage} AMU
                          </Badge>
                          {farmer.flagged && (
                            <Badge variant="destructive">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Compliance: {farmer.complianceScore}%</p>
                          <p className="text-xs text-muted-foreground">Last treatment: {farmer.lastTreatment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "communication" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Farmer List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Active Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {prescriptionRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedFarmerChat === request.farmerId ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedFarmerChat(request.farmerId)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{request.farmerName}</p>
                            <p className="text-xs text-muted-foreground">
                              Animal: {request.animalType} #{request.animalId}
                            </p>
                          </div>
                          {request.hasMessages && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        {request.lastMessage && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{request.lastMessage}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Interface */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedFarmerChat
                      ? `Chat with ${prescriptionRequests.find((r) => r.farmerId === selectedFarmerChat)?.farmerName}`
                      : "Select a farmer to start chatting"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFarmerChat ? (
                    <div className="space-y-4">
                      {/* Chat Messages */}
                      <div className="h-64 border rounded-lg p-3 overflow-y-auto space-y-2">
                        {chatMessages.length === 0 ? (
                          <p className="text-muted-foreground text-center">No messages yet. Start the conversation!</p>
                        ) : (
                          chatMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === "vet" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-xs p-2 rounded-lg ${
                                  msg.sender === "vet" ? "bg-blue-500 text-white" : "bg-gray-100"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                                <p className="text-xs opacity-70">{msg.timestamp}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Select a farmer from the list to start chatting
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "reviews" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">Pending Reviews</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {prescriptionRequests.filter((r) => r.status === "pending").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Reviewed Today</p>
                        <p className="text-2xl font-bold text-green-600">
                          {prescriptionRequests.filter((r) => r.status === "reviewed").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TestTube className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">MRL Tests Scheduled</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {mrlTests.filter((t) => t.status === "scheduled").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">High Priority</p>
                        <p className="text-2xl font-bold text-red-600">
                          {prescriptionRequests.filter((r) => r.priority === "high" && r.status === "pending").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">New Messages</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {prescriptionRequests.filter((r) => r.hasMessages).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Prescription Review Queue</CardTitle>
                    <CardDescription>AI-generated prescriptions awaiting veterinary verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prescriptionRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Request #{request.id}</h4>
                                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                  {request.priority.toUpperCase()}
                                </Badge>
                                <Badge variant="secondary" className={getStatusColor(request.status)}>
                                  {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                  {request.status === "reviewed" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </Badge>
                                {request.hasMessages && (
                                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    New Message
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {request.farmerName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {request.farmerContact}
                                </span>
                                <span>
                                  Animal: {request.animalType} #{request.animalId}
                                </span>
                              </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>{request.submittedAt}</p>
                              {request.reviewedAt && <p>Reviewed: {request.reviewedAt}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Symptoms:</p>
                              <p className="text-sm text-muted-foreground">{request.symptoms}</p>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium text-blue-800">AI Recommendation:</p>
                                <Badge variant="outline" className="text-blue-700 border-blue-200">
                                  {request.aiConfidence}% confidence
                                </Badge>
                              </div>
                              <p className="text-sm text-blue-700">{request.aiRecommendation}</p>
                            </div>

                            {request.status === "reviewed" && request.vetNotes && (
                              <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-sm font-medium text-green-800">Vet Notes:</p>
                                <p className="text-sm text-green-700">{request.vetNotes}</p>
                              </div>
                            )}
                          </div>

                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => setSelectedRequest(request.id)} className="flex-1">
                                <FileText className="h-3 w-3 mr-1" />
                                Review Prescription
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleScheduleMRLTest(request.farmerId)}
                                className="bg-transparent"
                              >
                                <TestTube className="h-3 w-3 mr-1" />
                                Schedule MRL Test
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedFarmerChat(request.farmerId)
                                  setActiveSection("communication")
                                }}
                                className="bg-transparent"
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                Chat
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "mrl-tests" && (
            <Card>
              <CardHeader>
                <CardTitle>MRL Test Management</CardTitle>
                <CardDescription>Schedule and manage Maximum Residue Limit tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Schedule New Test */}
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Schedule New MRL Test</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <Label htmlFor="farmer-select">Farmer</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select farmer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="F001">Rajesh Kumar</SelectItem>
                            <SelectItem value="F002">Priya Sharma</SelectItem>
                            <SelectItem value="F003">Suresh Patel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="test-type">Test Type</Label>
                        <Select value={newTestType} onValueChange={setNewTestType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select test type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="milk">Milk Residue</SelectItem>
                            <SelectItem value="meat">Meat Residue</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="test-date">Test Date</Label>
                        <Input
                          id="test-date"
                          type="date"
                          value={newTestDate}
                          onChange={(e) => setNewTestDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Test
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Existing Tests */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Scheduled & Completed Tests</h4>
                    {mrlTests.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Test #{test.id}</span>
                            <Badge variant="secondary" className={getStatusColor(test.status)}>
                              {test.status === "scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                              {test.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                            </Badge>
                            {test.result && (
                              <Badge variant="outline" className="text-green-700 border-green-200">
                                {test.result}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {test.farmerName}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {test.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <TestTube className="h-3 w-3" />
                              {test.testType}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{test.scheduledDate}</p>
                          <p className="text-xs text-muted-foreground">{test.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "analytics" && (
            <Card>
              <CardHeader>
                <CardTitle>Veterinary Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard will be displayed here</p>
              </CardContent>
            </Card>
          )}

          {/* Prescription Review Modal */}
          {selectedRequest && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Review Prescription #{selectedRequest}</CardTitle>
                  <CardDescription>Verify and modify AI-generated prescription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const request = prescriptionRequests.find((r) => r.id === selectedRequest)
                    if (!request) return null

                    return (
                      <>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">AI Recommendation:</p>
                          <p className="text-sm text-blue-700">{request.aiRecommendation}</p>
                          <p className="text-xs text-blue-600 mt-1">Confidence: {request.aiConfidence}%</p>
                        </div>

                        <div className="space-y-3">
                          <Label>Your Decision</Label>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={prescriptionDecision === "approve" ? "default" : "outline"}
                              onClick={() => setPrescriptionDecision("approve")}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant={prescriptionDecision === "modify" ? "default" : "outline"}
                              onClick={() => setPrescriptionDecision("modify")}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Modify
                            </Button>
                            <Button
                              size="sm"
                              variant={prescriptionDecision === "reject" ? "destructive" : "outline"}
                              onClick={() => setPrescriptionDecision("reject")}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>

                        {prescriptionDecision === "modify" && (
                          <div className="space-y-2">
                            <Label htmlFor="modified-prescription">Modified Prescription</Label>
                            <Textarea
                              id="modified-prescription"
                              placeholder="Enter your modified prescription..."
                              value={modifiedPrescription}
                              onChange={(e) => setModifiedPrescription(e.target.value)}
                              rows={3}
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="vet-notes">Veterinary Notes</Label>
                          <Textarea
                            id="vet-notes"
                            placeholder="Add your professional notes and recommendations..."
                            value={vetNotes}
                            onChange={(e) => setVetNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={() => {
                              if (prescriptionDecision) {
                                handlePrescriptionReview(selectedRequest, prescriptionDecision)
                              }
                            }}
                            disabled={!prescriptionDecision}
                            className="flex-1"
                          >
                            Submit Review
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(null)
                              setPrescriptionDecision(null)
                              setVetNotes("")
                              setModifiedPrescription("")
                            }}
                            className="bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    )
                  })()}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
