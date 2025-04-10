import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Nero.</span>
            <span className="text-sm text-muted-foreground">Powering Live Connections.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Welcome to Nero.</h1>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            The premier platform for creators to review music and connect with artists in real-time.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/create-session">
              <Button size="lg">Create a Session</Button>
            </Link>
            <Link href="/join-session">
              <Button variant="outline" size="lg">
                Join a Session
              </Button>
            </Link>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>For Creators</CardTitle>
                <CardDescription>Monetize your expertise and audience</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Create custom review sessions, set your own pricing, and manage submissions with our intuitive
                  dashboard.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/creator-features" className="text-sm underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Artists</CardTitle>
                <CardDescription>Get valuable feedback on your music</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Submit your tracks to your favorite creators and receive real-time feedback during live sessions.</p>
              </CardContent>
              <CardFooter>
                <Link href="/artist-features" className="text-sm underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Fans</CardTitle>
                <CardDescription>Discover new music and join the community</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Watch live review sessions, participate in the chat, and discover emerging artists before anyone else.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/fan-features" className="text-sm underline">
                  Learn more
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 Nero. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
