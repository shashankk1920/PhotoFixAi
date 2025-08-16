import React from "react";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Content Creator",
    quote: "This app saved me hours every week. The AI tools are amazing!",
  },
  {
    name: "Mark Li",
    role: "Designer",
    quote: "I love the Pro plan. It’s like having a design assistant in my toolbox.",
  },
];

const Testimonials = () => {
  return (
    <section className="mt-32 px-6 max-w-5xl mx-auto">
      <h3 className="text-4xl font-bold text-white text-center mb-12">What our users say</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white backdrop-blur-md"
          >
            <p className="text-lg italic mb-4 text-gray-300">"{t.quote}"</p>
            <div className="text-sm text-white/70">
              — {t.name}, <span className="text-cyan-400">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
