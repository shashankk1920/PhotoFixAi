import FeaturesSection from '../components/features-section'
import HeroSection from '../components/hero-section'
import { Button } from '../components/ui/button'
import Pricing from '../components/pricing'

import Link from 'next/link'
import React from 'react'

const page = () => {
  const stats = [
    { label:"Images Processes", value:1000, suffix:"+" },
    {label:"Active Users", value:500, suffix:"+" },
    {label:"AI Transformations", value:300, suffix:"+" },
    {label:"User Satisfaction", value:98, suffix:"%" 

    }
  ]
  return (
    <div className='pt-36'>
     <HeroSection />
      {/* stats */}

      <section className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/80 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border border-gray-800">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-400 uppercase tracking-wider text-base font-semibold mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* features */}
      <FeaturesSection />
      {/* pricing */}
      <Pricing />

      <section className='py-20 text-center'>
        <div className='max-w-2xl mx-auto px-6'>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
              PhotoFixAI
            </span>
            <br />
            <span className="text-gray-200 text-3xl font-semibold mt-2 block">AI-powered photo perfection</span>
          </h1>
          <p className='text-xl text-gray-300 mb-8'>Join thousands of users who trust PhotoFixAI to enhance, restore, and elevate their photos with cutting-edge AI technology.</p>

          <Link href="/dashboard">
          <Button variant="primary" size="xl">
            Try PhotoFixAI Now
          </Button>
        </Link>
        </div>
      </section>
    </div>

  )
}

export default page