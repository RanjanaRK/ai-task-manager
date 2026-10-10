import { useEffect, useState } from "react";
import { CalendarDays, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
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
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  category: "work" | "personal" | "study" | "other";
  dueDate: string | null;
  createdAt: string;
};

type TaskFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  category: "work" | "personal" | "study" | "other";
  dueDate: string;
};

type EditTaskDialogProps = {
  task: Task;
  onTaskUpdated: () => void;
};

const EditTaskDialog = ({ task, onTaskUpdated }: EditTaskDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      category: task.category,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    },
  });

  const priority = watch("priority");
  const status = watch("status");
  const category = watch("category");

  useEffect(() => {
    if (open) {
      reset({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        category: task.category,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [open, task, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to update the task.");
        return;
      }

      await api.put(
        `/tasks/update/${task._id}`,
        {
          title: data.title.trim(),
          description: data.description.trim(),
          priority: data.priority,
          status: data.status,
          category: data.category,
          dueDate: data.dueDate || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Task updated successfully!");

      setOpen(false);
      onTaskUpdated();
    } catch (error: any) {
      console.error("Update task error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to update task. Please try again.";

      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="Edit task"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit task</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>

          <DialogDescription>
            Update the details of your task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor={`edit-title-${task._id}`}>
              Title <span className="text-red-500">*</span>
            </Label>

            <Input
              id={`edit-title-${task._id}`}
              className="h-11"
              disabled={isSubmitting}
              {...register("title", {
                required: "Task title is required.",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters.",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters.",
                },
              })}
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor={`edit-description-${task._id}`}>Description</Label>

            <Textarea
              id={`edit-description-${task._id}`}
              className="min-h-24 resize-none"
              disabled={isSubmitting}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters.",
                },
              })}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Priority</Label>

              <Select
                value={priority}
                onValueChange={(value) =>
                  setValue("priority", value as TaskFormData["priority"])
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={status}
                onValueChange={(value) =>
                  setValue("status", value as TaskFormData["status"])
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={category}
              onValueChange={(value) =>
                setValue("category", value as TaskFormData["category"])
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor={`edit-due-date-${task._id}`}>Due Date</Label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id={`edit-due-date-${task._id}`}
                type="date"
                className="h-11 pl-10"
                disabled={isSubmitting}
                {...register("dueDate")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" />
                  Update Task
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
