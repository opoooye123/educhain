"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on initial load and path changes
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("educhain-user")
      const isAuth = !!userData
      setIsAuthenticated(isAuth)

      // Protected routes that require authentication
      const protectedRoutes = ["/students", "/funders", "/results"]
      const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

      // Public routes that should redirect authenticated users
      const authRoutes = ["/login", "/register"]
      const isAuthRoute = authRoutes.some((route) => pathname === route)

      if (isProtectedRoute && !isAuth) {
        // Redirect to login if trying to access protected route without auth
        router.push("/login")
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
        })
      } else if (isAuthRoute && isAuth) {
        // Redirect to appropriate dashboard if already logged in
        const user = JSON.parse(userData || "{}")
        if (user.type === "student") {
          router.push("/students")
        } else {
          router.push("/funders")
        }
      }
    }

    checkAuth()

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname, router, toast])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-transparent border-white animate-spin"></div>
              <div className="absolute top-0 w-full h-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L12 8M12 16L12 20M6 12L2 12M22 12L18 12M19.0784 19.0784L16.25 16.25M19.0784 4.99999L16.25 7.82842M4.92157 19.0784L7.75 16.25M4.92157 4.99999L7.75 7.82842"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">EduChain</h1>
            <p className="text-white/80">Loading your blockchain experience...</p>
          </div>
        </div>
      ) : (
        <div className="page-transition">
          {children}
          <Toaster />
        </div>
      )}
    </ThemeProvider>
  )
}

