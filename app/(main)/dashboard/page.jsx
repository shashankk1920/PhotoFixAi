"use client";
import React from "react";
import { api } from "@/convex/_generated/api.js";
import { useQuery } from "convex/react";
import { useConvexQuery } from "@/hooks/use-convex-query.jsx";

const Dashboard = () => {
  const { data: projects, isLoading, error } = useConvexQuery(api.projects.getUserProjects);

  console.log("useConvexQuery response:", { projects, isLoading, error });

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
