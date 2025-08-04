"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path = usePathname();
    const { user } = useUser();

  if(path.includes('/editor')){
    return null; // Don't render the header on editor pages
  }
  return (
    
<header className='fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl'>
    <div className='backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-lg'>
    <Link href="/" className='text-lg font-bold text-white hover:text-blue-300 transition-colors duration-300'>
      PhotoFixAI
    </Link>
    {path === '/' && (
        <div className='hidden md:flex space-x-8'>
             <Link href="#features" className='text-sm font-medium text-white/80 transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>
              Features
            </Link>
            <Link href="#pricing" className='text-sm font-medium text-white/80 transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>
              Pricing
            </Link>

            <Link href="#contact" className='text-sm font-medium text-white/80 transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>
              Contact
            </Link>
        </div>
    )}

    <div className="flex items-center gap-3"> 
      <SignedOut>
              <SignInButton>
                <button className="bg-transparent border border-white/30 text-white rounded-full font-medium text-sm px-4 py-2 hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-gradient-to-r from-[#6c47ff] to-[#8b5cf6] text-white rounded-full font-medium text-sm px-5 py-2 hover:from-[#5a3ce6] hover:to-[#7c3aed] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Sign Up
                </button>
              </SignUpButton>
      </SignedOut>
      
      <SignedIn>
              <UserButton 
              appearance={{
                elements:{
                  avatarBox: "w-10 h-10 hover:scale-105 transition-transform duration-300",
                }
              }}
              />
      </SignedIn>
    </div>
    </div>
</header>
  )
}

export default Header