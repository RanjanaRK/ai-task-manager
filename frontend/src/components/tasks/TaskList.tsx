import {
  CalendarDays,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditTaskDialog from "./EditTaskDialog";
import type { Task } from "./EditTaskDialog";

type TaskListProps = {
  refreshKey?: number;
};

const TaskList = ({ refreshKey }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to view your tasks.");
        return;
      }

      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks || response.data);
    } catch (error: any) {
      console.error("Fetch tasks error:", error);

      const message = error.response?.data?.message || "Failed to load tasks.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  const openDeleteDialog = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      setIsDeleting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete the task.");
        return;
      }

      await api.delete(`/tasks/delete/${selectedTask._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task deleted successfully!");

      setDeleteDialogOpen(false);
      setSelectedTask(null);

      await fetchTasks();
    } catch (error: any) {
      console.error("Delete task error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to delete task. Please try again.";

      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="border-border bg-card mt-8 rounded-2xl border border-dashed p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/40">
          <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        <h3 className="text-lg font-semibold">No tasks yet</h3>

        <p className="text-muted-foreground mt-2 text-sm">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border-border bg-card rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-card-foreground truncate text-base font-semibold">
                  {task.title}
                </h3>

                {task.description && (
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                    task.priority === "high"
                      ? "border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
                      : task.priority === "medium"
                        ? "border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300"
                        : "border-green-300 bg-green-100 text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
                  }`}
                >
                  {task.priority}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />

                      <span className="sr-only">Task actions</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <EditTaskDialog task={task} onTaskUpdated={fetchTasks} />

                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(task)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="bg-muted rounded-md px-2.5 py-1 text-xs font-medium capitalize">
                {task.category}
              </span>

              <span className="bg-muted rounded-md px-2.5 py-1 text-xs font-medium capitalize">
                {task.status.replace("-", " ")}
              </span>

              {task.dueDate && (
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <CalendarDays className="h-3.5 w-3.5" />

                  {new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setDeleteDialogOpen(open);

            if (!open) {
              setSelectedTask(null);
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Task?</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="text-foreground font-semibold">
                "{selectedTask?.title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Task
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskList;
