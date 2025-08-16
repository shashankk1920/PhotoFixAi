"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "./project-card";

export function ProjectGrid({ projects }) {
  const router = useRouter();

  const handleEditProject = (projectId) => {
    router.push(`/editor/${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-8 perspective-3d" style={{ perspective: '1200px' }}>
      {projects.map((project, idx) => (
        <div
          key={project._id}
          className="animate-fadeInUp"
          style={{ animationDelay: `${idx * 80}ms`, transformStyle: 'preserve-3d' }}
        >
          <ProjectCard
            project={project}
            onEdit={() => handleEditProject(project._id)}
          />
        </div>
      ))}
    </div>
  );
}