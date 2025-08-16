import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// Removed Card and CardContent imports
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function ProjectCard({ project, onEdit }) {
  const { mutate: deleteProject, isLoading } = useConvexMutation(
    api.projects.deleteProject
  );

  const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await deleteProject({ projectId: project._id });
        toast.success("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  return (
  <div className="group relative bg-gradient-to-br from-slate-800/80 via-cyan-900/60 to-purple-900/80 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1 hover:border-cyan-400 backdrop-blur-xl ">
      {/* Thumbnail */}
      <div className="aspect-video bg-slate-700 relative overflow-hidden">
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-cyan-900/60 to-purple-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-md">
            <Button variant="glass" size="sm" onClick={onEdit} className="gap-2 shadow-lg hover:scale-110 hover:rotate-1 transition-transform duration-300 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 text-white/90">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={handleDelete}
              className="gap-2  hover:text-red-300 shadow-lg hover:scale-110 hover:rotate-1 transition-transform duration-300 bg-gradient-to-r from-red-400/30 to-purple-500/30 text-white/90"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="pb-7 pr-3 pl-3 pt-2">
        <h3 className="font-bold text-white text-lg mb-2 truncate drop-shadow-lg">
          {project.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-white/80">
          <span className="italic">Updated {lastUpdated}</span>
          <Badge
            variant="secondary"
            className="text-xs bg-gradient-to-r from-cyan-400/40 via-blue-500/30 to-purple-500/40 backdrop-blur-md text-white/90 shadow-lg border border-white/10 px-4 py-1 rounded-xl font-semibold"
          >
            {project.width} × {project.height}
          </Badge>
        </div>
      </div>
    </div>
  );
}