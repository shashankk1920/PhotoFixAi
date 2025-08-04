import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <SignIn 
        path="/sign-in"
        routing="path"
        afterSignInUrl="/"
        redirectUrl="/"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white',
            footerActionLink: 'text-purple-600 hover:text-purple-700'
          }
        }}
      />
      <div className="mt-4 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
