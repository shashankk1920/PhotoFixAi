'use client'

import { Button } from "../components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">PhotoFixAI</h1>
      <div className="text-center">
        <p className="text-lg text-gray-300 mb-6">
          AI-powered photo editing and enhancement
        </p>
        
        {isSignedIn && user && (
          <div className="mb-6 space-y-4">
            <div className="p-4 bg-green-800/20 rounded-lg">
              <p className="text-green-300">
                Welcome back, {user.firstName || user.name || 'User'}! 
                You are successfully signed in.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                ✅ Clerk Authentication: Working
              </p>
            </div>
          </div>
        )}
        
        <Button className="bg-gradient-to-r from-[#6c47ff] to-[#8b5cf6] hover:from-[#5a3ce6] hover:to-[#7c3aed]">
          Get Started
        </Button>
      </div>
    </div>
  );
}


