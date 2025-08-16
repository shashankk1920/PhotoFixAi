import React from "react";

const FeatureComparison = () => {
  const features = [
    { label: "3 projects maximum", free: true, pro: true },
    { label: "Unlimited projects", free: false, pro: true },
    { label: "20 exports/month", free: true, pro: true },
    { label: "Unlimited exports", free: false, pro: true },
    { label: "Basic Editing Tools", free: true, pro: true },
    { label: "AI Background Remover", free: false, pro: true },
    { label: "AI Image Extender", free: false, pro: true },
    { label: "Priority Support", free: false, pro: true },
  ];

  return (
    <div className="mt-24 max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg">
      <table className="w-full text-left text-sm text-white">
        <thead className="bg-gradient-to-r from-cyan-700 to-purple-700 text-white uppercase text-xs">
          <tr>
            <th className="py-4 px-6">Feature</th>
            <th className="py-4 px-6 text-center">Free</th>
            <th className="py-4 px-6 text-center">Pro</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr
              key={idx}
              className={`border-t border-white/10 ${
                idx % 2 === 0 ? "bg-white/5" : "bg-white/10"
              }`}
            >
              <td className="py-3 px-6">{feature.label}</td>
              <td className="text-center">
                {feature.free ? (
                  <span className="text-green-400">✔</span>
                ) : (
                  <span className="text-red-400">—</span>
                )}
              </td>
              <td className="text-center">
                {feature.pro ? (
                  <span className="text-green-400">✔</span>
                ) : (
                  <span className="text-red-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComparison;
