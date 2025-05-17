import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl gradient-border">
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold gradient-text">Vocalingo</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Must be at least 8 characters long</p>
            </div>

            <Button type="submit" className="w-full gradient-bg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Already have an account?</span>
            <Link href="/login" className="text-sm text-indigo-500 hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Apple
            </Button>
          </div>

          <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="#" className="text-indigo-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-indigo-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
