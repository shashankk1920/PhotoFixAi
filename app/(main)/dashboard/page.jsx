"use client";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api.js";
import { useConvexQuery } from "@/hooks/use-convex-query.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Plus, Sparkles } from "lucide-react";


import Image from "next/image";
import { NewProjectModal } from "./_components/new-project-modal";

const Dashboard = () => {
  const { data: projects, isLoading, error } = useConvexQuery(api.projects.getProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="bg-white/10 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading projects</h2>
          <p className="text-white/80">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-blue-950 to-purple-950">
      <div className="container mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Your Projects
            </h1>
            <p className="text-white/70 text-lg">
              Create and manage your AI-powered image designs
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="primary"
            size="lg"
            className="gap-2 shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition-transform"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Projects Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} />
        )}

        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
        /> 
      </div>
    </div>
  );
};


// Empty state when user has no projects
function EmptyState({ onCreateProject }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-6">
        <Image src="/window.svg" alt="Create Project" width={48} height={48} className="h-12 w-12 text-cyan-400" />
      </div>

      <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-lg">
        Create Your First Project
      </h3>

      <p className="text-white/70 mb-8 max-w-md">
        Upload an image to start editing with our powerful AI tools, or create a blank canvas to design from scratch.
      </p>

      <Button
        onClick={onCreateProject}
        variant="primary"
        size="xl"
        className="gap-2 shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition-transform"
      >
        <Sparkles className="h-5 w-5" />
        Start Creating
      </Button>
    </div>
  );
}

export default Dashboard;
