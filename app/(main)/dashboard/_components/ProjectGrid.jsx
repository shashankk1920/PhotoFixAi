import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return <div className="text-white/70 py-8">No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
      {projects.map((project) => (
        <div key={project._id} className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              width={320}
              height={180}
              className="rounded-lg mb-4 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-to-r from-cyan-900 to-purple-900 rounded-lg mb-4 flex items-center justify-center text-white/40">
              No Image
            </div>
          )}
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/60 text-sm mb-2">{project._id}</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.location.href = `/editor/${project._id}`}
            className="mt-2"
          >
            Open Editor
          </Button>
        </div>
      ))}
    </div>
  );
}
