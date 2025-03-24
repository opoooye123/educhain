"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  AnimatedCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/animated-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { login } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [connecting, setConnecting] = useState(false)
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    institution: "",
    major: "cs",
  })
  const [funderForm, setFunderForm] = useState({
    name: "",
    email: "",
    type: "foundation",
    focus: "tech",
  })

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setStudentForm((prev) => ({
      ...prev,
      [id.replace("student-", "")]: value,
    }))
  }

  const handleFunderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFunderForm((prev) => ({
      ...prev,
      [id.replace("funder-", "")]: value,
    }))
  }

  const handleRegister = (userType: "student" | "funder") => {
    setConnecting(true)

    // Validate form
    const form = userType === "student" ? studentForm : funderForm
    if (!form.name || !form.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setConnecting(false)
      return
    }

    // Simulate wallet connection and registration
    setTimeout(() => {
      try {
        // Generate a mock wallet address
        const walletAddress = "0x" + Math.random().toString(36).substring(2, 15)

        // Login the user
        login(walletAddress, userType)

        // Show success toast
        toast({
          title: "Registration successful",
          description: `Welcome to EduChain! Your wallet is now connected.`,
          variant: "default",
        })

        // Redirect based on user type
        if (userType === "student") {
          router.push("/students")
        } else {
          router.push("/funders")
        }
      } catch (error) {
        toast({
          title: "Registration failed",
          description: "There was an error during registration. Please try again.",
          variant: "destructive",
        })
      } finally {
        setConnecting(false)
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              EduChain
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <AnimatedCard animation="scale" hover="glow" className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Register to join the EduChain platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="funder">Funder</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      placeholder="Enter your full name"
                      value={studentForm.name}
                      onChange={handleStudentChange}
                      className="border-indigo-100 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email Address</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={studentForm.email}
                      onChange={handleStudentChange}
                      className="border-indigo-100 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-institution">Institution</Label>
                    <Input
                      id="student-institution"
                      placeholder="Enter your school or university"
                      value={studentForm.institution}
                      onChange={handleStudentChange}
                      className="border-indigo-100 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-major">Major/Field of Study</Label>
                    <Select
                      value={studentForm.major}
                      onValueChange={(value) => setStudentForm((prev) => ({ ...prev, major: value }))}
                    >
                      <SelectTrigger id="student-major" className="border-indigo-100 focus-visible:ring-indigo-500">
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="arts">Arts & Humanities</SelectItem>
                        <SelectItem value="science">Natural Sciences</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <AnimatedButton
                  variant="gradient"
                  animation="pulse"
                  className="w-full"
                  onClick={() => handleRegister("student")}
                  disabled={connecting}
                >
                  {connecting ? "Connecting Wallet..." : "Connect Wallet & Register"}
                </AnimatedButton>
              </TabsContent>
              <TabsContent value="funder" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="funder-name">Organization Name</Label>
                    <Input
                      id="funder-name"
                      placeholder="Enter your organization name"
                      value={funderForm.name}
                      onChange={handleFunderChange}
                      className="border-purple-100 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funder-email">Email Address</Label>
                    <Input
                      id="funder-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={funderForm.email}
                      onChange={handleFunderChange}
                      className="border-purple-100 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funder-type">Organization Type</Label>
                    <Select
                      value={funderForm.type}
                      onValueChange={(value) => setFunderForm((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger id="funder-type" className="border-purple-100 focus-visible:ring-purple-500">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funder-focus">Funding Focus</Label>
                    <Select
                      value={funderForm.focus}
                      onValueChange={(value) => setFunderForm((prev) => ({ ...prev, focus: value }))}
                    >
                      <SelectTrigger id="funder-focus" className="border-purple-100 focus-visible:ring-purple-500">
                        <SelectValue placeholder="Select funding focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="stem">STEM</SelectItem>
                        <SelectItem value="diversity">Diversity & Inclusion</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="general">General Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <AnimatedButton
                  variant="gradient"
                  animation="pulse"
                  className="w-full"
                  onClick={() => handleRegister("funder")}
                  disabled={connecting}
                >
                  {connecting ? "Connecting Wallet..." : "Connect Wallet & Register"}
                </AnimatedButton>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground text-center">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </div>
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 font-medium underline-offset-4 hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </AnimatedCard>
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

