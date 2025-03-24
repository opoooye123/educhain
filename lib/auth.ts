// Authentication utilities for EduChain

// User types
export type UserType = "student" | "funder"

export interface User {
  id: string
  type: UserType
  name: string
  email?: string
  walletAddress: string
  avatar?: string
}

// Student-specific data
export interface StudentData {
  institution?: string
  major?: string
  gpa?: number
  credits?: number
  year?: string
  skills?: string[]
  results?: any[]
  fundingReceived?: number
  pendingApplications?: number
}

// Funder-specific data
export interface FunderData {
  organization?: string
  fundingType?: string
  focus?: string
  totalFunded?: number
  activePrograms?: number
  applications?: number
  successRate?: number
}

// Login function
export function login(walletAddress: string, userType: UserType): User {
  // Create a new user object
  const user: User = {
    id: generateUserId(),
    type: userType,
    name: generateRandomName(userType),
    walletAddress,
    avatar: userType === "student" ? generateInitials(generateRandomName(userType)) : undefined,
  }

  // Save to localStorage
  localStorage.setItem("educhain-user", JSON.stringify(user))

  // Initialize user data based on type
  if (userType === "student") {
    const studentData: StudentData = {
      institution: "Tech University",
      major: "Computer Science",
      gpa: 3.8,
      credits: 86,
      year: "Junior",
      skills: ["Blockchain", "Web Development", "AI"],
      results: generateMockResults(),
      fundingReceived: 2500,
      pendingApplications: 3,
    }
    localStorage.setItem("educhain-student-data", JSON.stringify(studentData))
  } else {
    const funderData: FunderData = {
      organization: "Tech Innovation Foundation",
      fundingType: "Foundation",
      focus: "Technology",
      totalFunded: 12500,
      activePrograms: 3,
      applications: 12,
      successRate: 85,
    }
    localStorage.setItem("educhain-funder-data", JSON.stringify(funderData))
  }

  return user
}

// Logout function
export function logout(): void {
  localStorage.removeItem("educhain-user")
  localStorage.removeItem("educhain-student-data")
  localStorage.removeItem("educhain-funder-data")
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("educhain-user")
}

// Get current user
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem("educhain-user")
  if (!userData) return null

  return JSON.parse(userData) as User
}

// Get student data
export function getStudentData(): StudentData | null {
  const data = localStorage.getItem("educhain-student-data")
  if (!data) return null

  return JSON.parse(data) as StudentData
}

// Get funder data
export function getFunderData(): FunderData | null {
  const data = localStorage.getItem("educhain-funder-data")
  if (!data) return null

  return JSON.parse(data) as FunderData
}

// Update student data
export function updateStudentData(data: Partial<StudentData>): void {
  const currentData = getStudentData() || {}
  const updatedData = { ...currentData, ...data }
  localStorage.setItem("educhain-student-data", JSON.stringify(updatedData))
}

// Update funder data
export function updateFunderData(data: Partial<FunderData>): void {
  const currentData = getFunderData() || {}
  const updatedData = { ...currentData, ...data }
  localStorage.setItem("educhain-funder-data", JSON.stringify(updatedData))
}

// Helper functions
function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function generateInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

function generateRandomName(type: UserType): string {
  const studentNames = ["Alex Johnson", "Maria Garcia", "David Kim", "Sarah Williams", "James Lee", "Emily Chen"]

  const funderNames = [
    "Tech Innovation Foundation",
    "Future Leaders Fund",
    "Global Education Initiative",
    "STEM Advancement Group",
    "Digital Futures Alliance",
    "Blockchain Education Network",
  ]

  const names = type === "student" ? studentNames : funderNames
  return names[Math.floor(Math.random() * names.length)]
}

function generateMockResults(): any[] {
  return [
    {
      course: "CS401: Advanced Algorithms",
      grade: "A",
      credits: 4,
      date: "March 15, 2025",
      hash: "0x8f2e3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    },
    {
      course: "CS450: Blockchain Development",
      grade: "A-",
      credits: 4,
      date: "March 10, 2025",
      hash: "0x7d3c9a2b8e7f6d5c4b3a2e1f0d9c8b7a6e5f4d3c",
    },
    {
      course: "MATH302: Discrete Mathematics",
      grade: "B+",
      credits: 3,
      date: "March 5, 2025",
      hash: "0x6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s9t8u7",
    },
  ]
}

