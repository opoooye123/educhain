"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GraduationCap, Search, ExternalLink, FileText, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<null | any[]>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() === "") {
      setSearchResults(null)
      return
    }

    // Mock search results
    setSearchResults([
      {
        id: "0x8f2e3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
        student: "Alex Johnson",
        studentId: "AJ2025",
        institution: "Tech University",
        course: "CS401: Advanced Algorithms",
        grade: "A",
        credits: 4,
        date: "March 15, 2025",
        verified: true,
        avatar: "AJ",
      },
    ])
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
            <Link href="/funders" className="text-sm font-medium text-muted-foreground">
              Funders
            </Link>
            <Link href="/results" className="text-sm font-medium">
              Results
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify Academic Results</h1>
            <p className="text-muted-foreground">
              Search for a student's academic record by transaction hash, student ID, or name to verify its authenticity
              on the blockchain.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Records</CardTitle>
              <CardDescription>Enter a transaction hash, student ID, or student name</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Transaction hash, student ID, or name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Verify</Button>
              </form>
            </CardContent>
          </Card>

          {searchResults === null ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">No Records Searched Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a transaction hash, student ID, or student name to search for and verify academic records on the
                blockchain.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">No Records Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any academic records matching your search query. Please check the information and try
                again.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Search Results</h2>
              {searchResults.map((result, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{result.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{result.student}</CardTitle>
                        {result.verified ? (
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        ID: {result.studentId} • {result.institution}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Course</div>
                        <div className="font-medium">{result.course}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Grade</div>
                        <div className="font-medium">
                          {result.grade} ({result.credits} credits)
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Date Recorded</div>
                        <div className="font-medium">{result.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Transaction Hash</div>
                        <div className="font-medium truncate">
                          {result.id.substring(0, 10)}...{result.id.substring(result.id.length - 6)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`https://etherscan.io/tx/${result.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Blockchain
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
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

