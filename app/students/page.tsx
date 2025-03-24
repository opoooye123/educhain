"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  AnimatedCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/animated-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, FileText, Coins, ArrowRight, ExternalLink, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getCurrentUser, getStudentData, logout } from "@/lib/auth"

export default function StudentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user data from localStorage
    const currentUser = getCurrentUser()
    const data = getStudentData()

    if (currentUser && currentUser.type === "student") {
      setUser(currentUser)
      setStudentData(data)
    } else {
      // Redirect to login if not a student
      router.push("/login")
      toast({
        title: "Access denied",
        description: "You must be logged in as a student to view this page",
        variant: "destructive",
      })
    }

    setLoading(false)
  }, [router, toast])

  const handleLogout = () => {
    logout()
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-transparent border-white animate-spin"></div>
            <div className="absolute top-0 w-full h-full flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Loading</h1>
          <p className="text-white/80">Fetching your academic records...</p>
        </div>
      </div>
    )
  }

  if (!user || !studentData) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              EduChain
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link href="/students" className="text-sm font-medium text-indigo-600">
              Students
            </Link>
            <Link
              href="/funders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Funders
            </Link>
            <Link
              href="/results"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Results
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-600 border-indigo-200">
              {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
            </Badge>
            <AnimatedButton variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </AnimatedButton>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-12">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="results">My Results</TabsTrigger>
            <TabsTrigger value="funding">Funding Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedCard animation="slide-right" hover="lift" className="border-indigo-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                  <FileText className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentData.credits}/120</div>
                  <p className="text-xs text-muted-foreground">{studentData.major || "Computer Science"}</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard animation="scale" hover="lift" className="border-purple-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GPA</CardTitle>
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentData.gpa}/4.0</div>
                  <p className="text-xs text-muted-foreground">Last updated: March 15, 2025</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard animation="scale" hover="lift" className="border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funding Received</CardTitle>
                  <Coins className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${studentData.fundingReceived}</div>
                  <p className="text-xs text-muted-foreground">From 2 funders</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard animation="slide-left" hover="lift" className="border-indigo-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                  <FileText className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentData.pendingApplications}</div>
                  <p className="text-xs text-muted-foreground">Total requested: $5,000</p>
                </CardContent>
              </AnimatedCard>
            </div>
            <AnimatedCard animation="fade" hover="glow" className="border-indigo-100">
              <CardHeader>
                <CardTitle>Degree Progress</CardTitle>
                <CardDescription>
                  {studentData.major || "Computer Science"} - Expected graduation: May 2026
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Overall Completion</div>
                      <div className="font-medium">72%</div>
                    </div>
                    <Progress value={72} className="h-2 bg-indigo-100">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Core Requirements</div>
                      <div className="font-medium">85%</div>
                    </div>
                    <Progress value={85} className="h-2 bg-purple-100">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    </Progress>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Electives</div>
                      <div className="font-medium">60%</div>
                    </div>
                    <Progress value={60} className="h-2 bg-pink-100">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>
          <TabsContent value="results" className="space-y-4 mt-6">
            <AnimatedCard animation="scale" hover="glow" className="border-indigo-100">
              <CardHeader>
                <CardTitle>Academic Results</CardTitle>
                <CardDescription>
                  All results are securely stored on the blockchain and cannot be altered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Spring 2025</h3>
                    <div className="space-y-2">
                      {(studentData.results || []).map((course: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div>
                            <div className="font-medium">{course.course}</div>
                            <div className="text-sm text-muted-foreground">{course.credits} credits</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                              {course.grade}
                            </Badge>
                            <AnimatedButton variant="ghost" size="icon" asChild animation="scale">
                              <Link href={`https://etherscan.io/tx/${course.hash}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View on blockchain</span>
                              </Link>
                            </AnimatedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Fall 2024</h3>
                    <div className="space-y-2">
                      {[
                        {
                          course: "CS350: Database Systems",
                          grade: "A",
                          credits: 4,
                          hash: "0x5b4a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
                        },
                        {
                          course: "CS375: Web Development",
                          grade: "A",
                          credits: 3,
                          hash: "0x4a3b6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
                        },
                        {
                          course: "ECON201: Microeconomics",
                          grade: "B",
                          credits: 3,
                          hash: "0x3c2d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
                        },
                        {
                          course: "ENG210: Technical Writing",
                          grade: "A-",
                          credits: 3,
                          hash: "0x2d1e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0",
                        },
                      ].map((course, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div>
                            <div className="font-medium">{course.course}</div>
                            <div className="text-sm text-muted-foreground">{course.credits} credits</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                              {course.grade}
                            </Badge>
                            <AnimatedButton variant="ghost" size="icon" asChild animation="scale">
                              <Link href={`https://etherscan.io/tx/${course.hash}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View on blockchain</span>
                              </Link>
                            </AnimatedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <AnimatedButton variant="outline" className="w-full" animation="scale">
                  Request Transcript Verification
                </AnimatedButton>
              </CardFooter>
            </AnimatedCard>
          </TabsContent>
          <TabsContent value="funding" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatedCard animation="slide-right" hover="lift" className="border-indigo-100">
                <CardHeader>
                  <CardTitle>Active Applications</CardTitle>
                  <CardDescription>Your current funding applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Blockchain Innovation Scholarship",
                      amount: "$3,000",
                      status: "Under Review",
                      deadline: "April 15, 2025",
                      progress: 60,
                    },
                    {
                      title: "Computer Science Excellence Fund",
                      amount: "$1,500",
                      status: "Under Review",
                      deadline: "May 1, 2025",
                      progress: 40,
                    },
                    {
                      title: "Tech Diversity Grant",
                      amount: "$500",
                      status: "Under Review",
                      deadline: "April 30, 2025",
                      progress: 75,
                    },
                  ].map((app, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-3 bg-white hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{app.title}</h4>
                          <p className="text-sm text-muted-foreground">Amount: {app.amount}</p>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                          {app.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex justify-between">
                          <span>Application Progress</span>
                          <span>Deadline: {app.deadline}</span>
                        </div>
                        <Progress value={app.progress} className="h-2 bg-amber-100">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <AnimatedButton variant="outline" className="w-full" animation="scale">
                    View All Applications
                  </AnimatedButton>
                </CardFooter>
              </AnimatedCard>
              <AnimatedCard animation="slide-left" hover="lift" className="border-purple-100">
                <CardHeader>
                  <CardTitle>Available Opportunities</CardTitle>
                  <CardDescription>Funding opportunities matching your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Future Tech Leaders Scholarship",
                      funder: "TechCorp Foundation",
                      amount: "$5,000",
                      deadline: "June 1, 2025",
                      match: "98% match",
                    },
                    {
                      title: "Women in STEM Grant",
                      funder: "Diversity in Tech Alliance",
                      amount: "$2,500",
                      deadline: "May 15, 2025",
                      match: "95% match",
                    },
                    {
                      title: "Open Source Contributors Fund",
                      funder: "GitHub Education",
                      amount: "$1,000",
                      deadline: "Rolling applications",
                      match: "90% match",
                    },
                  ].map((opp, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-3 bg-white hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{opp.title}</h4>
                          <p className="text-sm text-muted-foreground">By: {opp.funder}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          {opp.match}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium">{opp.amount}</span>
                          <span className="text-muted-foreground ml-2">Deadline: {opp.deadline}</span>
                        </div>
                        <AnimatedButton size="sm" animation="scale" variant="gradient">
                          Apply
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <AnimatedButton className="w-full" animation="pulse" variant="gradient">
                    Explore More Opportunities
                  </AnimatedButton>
                </CardFooter>
              </AnimatedCard>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6 md:py-0 bg-white/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-sm text-muted-foreground">© 2025 EduChain. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

