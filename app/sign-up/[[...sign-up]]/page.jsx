import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <SignUp 
        path="/sign-up"
        routing="path"
        afterSignUpUrl="/"
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
          Already have an account?{' '}
          <Link href="/sign-in" className="text-purple-400 hover:text-purple-300">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
