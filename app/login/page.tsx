"use client"

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
import { GraduationCap, Wallet, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [connecting, setConnecting] = useState(false)

  const handleConnect = (userType: "student" | "funder") => {
    setConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      try {
        // Generate a mock wallet address
        const walletAddress = "0x" + Math.random().toString(36).substring(2, 15)

        // Login the user
        login(walletAddress, userType)

        // Show success toast
        toast({
          title: "Connected successfully",
          description: `Wallet ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} connected`,
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
          title: "Connection failed",
          description: "There was an error connecting your wallet. Please try again.",
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
      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatedCard animation="scale" hover="glow" className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to EduChain</CardTitle>
            <CardDescription>Connect your wallet to access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="funder">Funder</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="mt-6 space-y-4">
                <div className="text-center space-y-2 p-4 rounded-lg bg-indigo-50">
                  <Sparkles className="h-12 w-12 mx-auto text-indigo-500" />
                  <h3 className="font-medium">Student Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet to access your academic records, track your progress, and apply for funding.
                  </p>
                </div>
                <AnimatedButton
                  variant="gradient"
                  animation="pulse"
                  className="w-full"
                  onClick={() => handleConnect("student")}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </AnimatedButton>
              </TabsContent>
              <TabsContent value="funder" className="mt-6 space-y-4">
                <div className="text-center space-y-2 p-4 rounded-lg bg-purple-50">
                  <Sparkles className="h-12 w-12 mx-auto text-purple-500" />
                  <h3 className="font-medium">Funder Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet to create funding programs, review applications, and support promising students.
                  </p>
                </div>
                <AnimatedButton
                  variant="gradient"
                  animation="pulse"
                  className="w-full"
                  onClick={() => handleConnect("funder")}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </AnimatedButton>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
            </div>
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-indigo-600 font-medium underline-offset-4 hover:underline">
                Register now
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

