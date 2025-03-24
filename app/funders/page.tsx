"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, Coins, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function FundersPage() {
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnected(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <Link href="/" className="text-xl font-bold">
              EduChain
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Home
            </Link>
            <Link href="/students" className="text-sm font-medium text-muted-foreground">
              Students
            </Link>
            <Link href="/funders" className="text-sm font-medium">
              Funders
            </Link>
            <Link href="/results" className="text-sm font-medium text-muted-foreground">
              Results
            </Link>
          </nav>
          {connected ? (
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Connected: 0x5d6...7e8f
              </Badge>
            </div>
          ) : (
            <Button onClick={handleConnect}>Connect Wallet</Button>
          )}
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-12">
        {connected ? (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="students">Find Students</TabsTrigger>
              <TabsTrigger value="programs">My Programs</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,500</div>
                    <p className="text-xs text-muted-foreground">Across 5 students</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">$7,500 available funds</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Applications</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">8 new this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">Of funded students graduated</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Students who recently applied to your programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Alex Johnson",
                        program: "Tech Leaders Scholarship",
                        amount: "$3,000",
                        date: "March 20, 2025",
                        avatar: "AJ",
                      },
                      {
                        name: "Maria Garcia",
                        program: "Women in STEM Grant",
                        amount: "$2,500",
                        date: "March 18, 2025",
                        avatar: "MG",
                      },
                      {
                        name: "David Kim",
                        program: "Open Source Fund",
                        amount: "$1,000",
                        date: "March 15, 2025",
                        avatar: "DK",
                      },
                    ].map((app, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarFallback>{app.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{app.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{app.program}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{app.amount}</p>
                          <p className="text-xs text-muted-foreground">{app.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Applications
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Program Performance</CardTitle>
                    <CardDescription>Funding allocation and success metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Tech Leaders Scholarship</div>
                        <div className="font-medium">$5,000 / $8,000</div>
                      </div>
                      <Progress value={62.5} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>2 recipients</div>
                        <div>62.5% allocated</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Women in STEM Grant</div>
                        <div className="font-medium">$5,000 / $7,500</div>
                      </div>
                      <Progress value={66.7} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>2 recipients</div>
                        <div>66.7% allocated</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Open Source Contributors Fund</div>
                        <div className="font-medium">$2,500 / $5,000</div>
                      </div>
                      <Progress value={50} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>1 recipient</div>
                        <div>50% allocated</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create New Program</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="students" className="space-y-4 mt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students by name, major, or skills..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Alex Johnson",
                    major: "Computer Science",
                    gpa: "3.8",
                    year: "Junior",
                    skills: ["Blockchain", "Web Development", "AI"],
                    avatar: "AJ",
                  },
                  {
                    name: "Maria Garcia",
                    major: "Computer Engineering",
                    gpa: "4.0",
                    year: "Senior",
                    skills: ["Machine Learning", "Cybersecurity", "IoT"],
                    avatar: "MG",
                  },
                  {
                    name: "David Kim",
                    major: "Software Engineering",
                    gpa: "3.7",
                    year: "Sophomore",
                    skills: ["Mobile Development", "UI/UX", "Cloud Computing"],
                    avatar: "DK",
                  },
                  {
                    name: "Sarah Williams",
                    major: "Data Science",
                    gpa: "3.9",
                    year: "Senior",
                    skills: ["Data Analysis", "Python", "Statistics"],
                    avatar: "SW",
                  },
                  {
                    name: "James Lee",
                    major: "Information Technology",
                    gpa: "3.6",
                    year: "Junior",
                    skills: ["Networking", "System Administration", "Security"],
                    avatar: "JL",
                  },
                  {
                    name: "Emily Chen",
                    major: "Computer Science",
                    gpa: "3.9",
                    year: "Senior",
                    skills: ["Algorithms", "Blockchain", "Research"],
                    avatar: "EC",
                  },
                ].map((student, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{student.name}</CardTitle>
                        <CardDescription>{student.major}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">GPA: </span>
                          <span className="font-medium">{student.gpa}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Year: </span>
                          <span className="font-medium">{student.year}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Skills:</div>
                        <div className="flex flex-wrap gap-1">
                          {student.skills.map((skill, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Profile</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Students</Button>
              </div>
            </TabsContent>
            <TabsContent value="programs" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Funding Programs</h2>
                <Button>Create New Program</Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Tech Leaders Scholarship",
                    description: "Supporting promising computer science students with leadership potential",
                    total: "$8,000",
                    allocated: "$5,000",
                    recipients: 2,
                    applicants: 15,
                    deadline: "June 1, 2025",
                  },
                  {
                    title: "Women in STEM Grant",
                    description:
                      "Empowering women pursuing degrees in science, technology, engineering, and mathematics",
                    total: "$7,500",
                    allocated: "$5,000",
                    recipients: 2,
                    applicants: 12,
                    deadline: "May 15, 2025",
                  },
                  {
                    title: "Open Source Contributors Fund",
                    description: "Supporting students who actively contribute to open source projects",
                    total: "$5,000",
                    allocated: "$2,500",
                    recipients: 1,
                    applicants: 8,
                    deadline: "Rolling applications",
                  },
                ].map((program, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Total Funding</div>
                          <div className="text-xl font-bold">{program.total}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Allocated</div>
                          <div className="text-xl font-bold">{program.allocated}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Recipients / Applicants</div>
                          <div className="text-xl font-bold">
                            {program.recipients} / {program.applicants}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Allocation Progress</div>
                          <div className="font-medium">
                            {(Number.parseInt(program.allocated.replace("$", "").replace(",", "")) /
                              Number.parseInt(program.total.replace("$", "").replace(",", ""))) *
                              100}
                            %
                          </div>
                        </div>
                        <Progress
                          value={
                            (Number.parseInt(program.allocated.replace("$", "").replace(",", "")) /
                              Number.parseInt(program.total.replace("$", "").replace(",", ""))) *
                            100
                          }
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">Application Deadline: {program.deadline}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Applicants
                      </Button>
                      <Button className="flex-1">Manage Program</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] max-w-md mx-auto text-center space-y-6">
            <Coins className="h-16 w-16 text-primary" />
            <h1 className="text-3xl font-bold">Funder Portal</h1>
            <p className="text-muted-foreground">
              Connect your wallet to create funding programs, review student applications, and support promising
              students with transparent blockchain-based transactions.
            </p>
            <Button onClick={handleConnect} size="lg">
              Connect Wallet
            </Button>
          </div>
        )}
      </main>
      <footer className="border-t py-6 md:py-0">
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

