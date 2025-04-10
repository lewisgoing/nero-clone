import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { ChevronLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <Link href="/" className="mb-8 flex items-center gap-2 self-start text-sm font-medium">
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome to Nero</h1>
        <p className="mb-8 text-center text-muted-foreground">Sign in to manage your music review sessions</p>

        <AuthForm />
      </div>
    </div>
  )
}
