"use client";

import useIntersectionObserver from '../hooks/use-intersection-observer.jsx';
import { PricingTable, useAuth ,ClerkCheckout} from '@clerk/nextjs'
import React, { useState } from 'react'
import { Button } from './ui/button.jsx';

const PricingCard = ({ id, plan, price, features, buttonText, featured, planId, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  const {has} = useAuth();

  const isCurrentPlan = id? has?.({plan :id }) : false;

  const handlePopup = async () => {
    if (isCurrentPlan) return;
    try {
      // ...replace with correct logic as previously discussed...
      if(window.Clerk && window.Clerk._internal_openCheckout) {
        await window.Clerk._internal_openCheckout({
          planId: planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      }

      
    } catch (error) {
  // ...removed console.error...
    }
  };
  return (
      <div
        ref={ref}
        className={`relative backdrop-blur-lg bg-white/5 border rounded-3xl p-8 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${isHovered ? "scale-105 rotate-1 shadow-2xl" : ""} ${featured ? "bg-gradient-to-b from-blue-500/20 to-purple-600/20 border-blue-500/50 scale-105" : "bg-white/5 border-white/10  "}`}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
  {/* Removed 'Most Popular' badge for featured plan */}
        <div className='text-center'>
  <h3 className='text-2xl font-bold text-white mb-4'>{plan}</h3>
          <div className='text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6'>
            ${price}
            {price > 0 && <span className='text-gray-400'>/month</span>}
          </div>
          <ul className='space-y-2 mb-6'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-center text-gray-300'>
                <span className='text-green-400 mr-3'>✔️</span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            variant={featured ? "primary" : "glass"}
            size="xl"
            className="w-full"
            disabled={isCurrentPlan || !planId}
            onClick={handlePopup}
          >
            {isCurrentPlan ? "Current Plan" : buttonText}
          </Button>
        </div>
      </div>
  );
}


const plans = [
    {
      id: "free_user",
      plan: "Free",
      price: 0,
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize",
        "Color adjustments",
        "Text Tool",
      ],
      buttonText: "Get Started Free",
    },
    {
      id: "pro",
      plan: "Pro",
      price: 12,
      features: [
        "Unlimited projects",
        "Unlimited exports",
        "All Editing Tools",
        "AI Background Remover",
        "AI Image Extender",
        "AI Retouch, Upscaler and more",
      ],
      featured: true,
      planId: "cplan_30xBaMx1a5xWQVhvlN67XXB1NcX",
      buttonText: "Upgrade to Pro",
    },
  ];

const Pricing = () => {
  return (
    <section id="pricing" className='py-20'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold text-white mb-6'>
            Simple{" "}
            <span className='bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg'>
              Pricing Plans
            </span>
          </h2>

          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Start free and upgrade when you need more power. No hidden fees, no surprises, cancel anytime.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;