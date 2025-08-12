"use client";
import useIntersectionObserver from '../hooks/use-intersection-observer.jsx';
import React, { useState } from 'react';

const FeatureCard = ({ title, description, icon, delay }) => {
    const [ref, isVisible] = useIntersectionObserver();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            ref={ref}
            className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${isHovered ? "scale-105 rotate-1 shadow-2xl" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='text-4xl mb-4'>{icon}</div>
            <h3 className='text-xl font-bold text-white mb-3'>{title}</h3>
            <p className='text-gray-300 leading-relaxed'>{description}</p>
        </div>
    );
};

const features = [
    {
        title: "AI Enhancement",
        description: "Instantly elevate your photos with cutting-edge AI algorithms that sharpen details, improve clarity, and bring out the best in every image.",
        icon: "✨",
    },
    {
        title: "Restoration",
        description: "Revive old, damaged, or low-resolution photos with a single click, restoring memories and preserving precious moments effortlessly.",
        icon: "🛠️",
    },
    {
        title: "Creative Tools",
        description: "Unleash your creativity with a suite of AI-powered features designed to help you transform ideas into stunning visual masterpieces.",
        icon: "🎨",
    },
    {
        title: "Batch Processing",
        description: "Save time and boost productivity by editing and enhancing multiple images simultaneously with smart batch operations.",
        icon: "📦",
    },
    {
        title: "Background Removal",
        description: "Remove or replace backgrounds with pinpoint AI accuracy, making your subjects stand out in any setting with professional results.",
        icon: "🌄",
    },
    {
        title: "Color Correction",
        description: "Automatically balance colors, adjust brightness, and enhance contrast to make your photos vibrant and true-to-life every time.",
        icon: "🌈",
    },
    {
        title: "Face Retouch",
        description: "Achieve flawless portraits with advanced AI retouching that smooths skin, brightens eyes, and enhances facial features naturally.",
        icon: "😊",
    },
    {
        title: "Noise Reduction",
        description: "Effortlessly remove grain and digital noise for crystal-clear, high-quality images—even in challenging low-light conditions.",
        icon: "🔇",
    },
    {
        title: "Instant Sharing",
        description: "Share your beautifully edited photos instantly to social media or cloud storage with seamless one-click integration.",
        icon: "🚀",
    }
];

const FeaturesSection = () => {
    return (
        <section className='py-20' id='features'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='text-center mb-16'>
                    <h2 className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-8'>
                        Features
                    </h2>
                    <p className='text-lg text-gray-300'>
                        Discover the powerful features of PhotoFixAI that make photo editing effortless and efficient. From AI-driven enhancements to intuitive tools, we have everything you need to transform your images with ease.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} delay={index * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;