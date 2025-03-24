import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/animated-card"
import { GraduationCap, Coins, ArrowRight, Shield, Sparkles, Users, FileCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">EduChain</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-white">
              Home
            </Link>
            <Link href="/students" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Students
            </Link>
            <Link href="/funders" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Funders
            </Link>
            <Link href="/results" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Results
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <AnimatedButton variant="secondary" animation="scale">
                Login
              </AnimatedButton>
            </Link>
            <Link href="/register">
              <AnimatedButton
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                animation="scale"
              >
                Register
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-pink-500/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 slide-in-left">
                <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-600 mb-2">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Blockchain-Powered Education
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Education Meets{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Blockchain Technology
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EduChain provides transparent, immutable educational records and connects students with funding
                  opportunities through blockchain technology.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/students">
                    <AnimatedButton variant="gradient" animation="pulse" className="w-full min-[400px]:w-auto">
                      For Students
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                  <Link href="/funders">
                    <AnimatedButton variant="outline" animation="scale" className="w-full min-[400px]:w-auto">
                      For Funders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center slide-in-right">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 p-1">
                  <div className="w-full h-full rounded-lg bg-white p-6">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <div className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                          <Shield className="h-8 w-8 text-indigo-500" />
                          <div className="text-lg font-semibold">Secure Records</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Immutable academic achievements stored on blockchain
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                          <Coins className="h-8 w-8 text-purple-500" />
                          <div className="text-lg font-semibold">Direct Funding</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Connect with funders based on verified achievements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 fade-in">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-sm text-white">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Blockchain-Powered Education
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform leverages blockchain technology to create a transparent and efficient education
                  ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <AnimatedCard animation="slide-right" hover="lift" className="border-indigo-100">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Verified Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Academic records are stored on the blockchain, ensuring they cannot be tampered with and are easily
                    verifiable.
                  </CardDescription>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard animation="scale" hover="lift" className="border-purple-100">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Coins className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Funding Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Students can showcase their achievements to potential funders who can directly support their
                    education.
                  </CardDescription>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard animation="slide-left" hover="lift" className="border-pink-100">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Transparent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    All funding transactions are recorded on the blockchain, ensuring complete transparency and
                    accountability.
                  </CardDescription>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 slide-in-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Growing Community</h2>
                <p className="text-muted-foreground">
                  EduChain is revolutionizing education by connecting students, institutions, and funders through
                  blockchain technology.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-sm">
                    <Users className="h-8 w-8 text-indigo-500 mb-2" />
                    <div className="text-2xl font-bold">5,000+</div>
                    <p className="text-sm text-muted-foreground text-center">Students Registered</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-sm">
                    <FileCheck className="h-8 w-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold">25,000+</div>
                    <p className="text-sm text-muted-foreground text-center">Records Verified</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 slide-in-right">
                <AnimatedCard
                  animation="scale"
                  hover="glow"
                  className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
                >
                  <CardHeader>
                    <CardTitle>Ready to Get Started?</CardTitle>
                    <CardDescription className="text-white/80">
                      Join EduChain today and experience the future of education.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Whether you're a student looking to secure your academic achievements or a funder wanting to
                      support promising talent, EduChain provides the platform you need.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href="/register" className="flex-1">
                        <AnimatedButton
                          variant="outline"
                          animation="scale"
                          className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          Create Account
                        </AnimatedButton>
                      </Link>
                      <Link href="/login" className="flex-1">
                        <AnimatedButton
                          variant="secondary"
                          animation="scale"
                          className="w-full bg-white text-indigo-600 hover:bg-white/90"
                        >
                          Sign In
                        </AnimatedButton>
                      </Link>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-sm">© 2025 EduChain. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

