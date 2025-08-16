"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel at any time from your account settings. No questions asked.",
  },
  {
    question: "What happens after my free plan usage is exhausted?",
    answer: "You can upgrade to Pro to continue using all features without limits.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We do not offer refunds, but you can try the free version first before upgrading.",
  },
  {
    question: "Is there a team/enterprise plan?",
    answer: "Yes! Contact us directly for custom enterprise pricing and features.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-28 max-w-3xl mx-auto px-6 text-white">
      <h3 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h3>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-white/10 bg-white/5 rounded-xl p-6 backdrop-blur-lg cursor-pointer transition hover:border-cyan-500"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              <span className="text-cyan-400">{openIndex === i ? "−" : "+"}</span>
            </div>
            {openIndex === i && (
              <p className="mt-4 text-sm text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
