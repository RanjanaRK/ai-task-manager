import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  AlertCircle,
  Briefcase,
  User,
  BookOpen,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import api from "@/lib/axios";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  category: "work" | "personal" | "study" | "other";
  dueDate?: string | null;
  createdAt?: string;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.tasks || []);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,

      todo: tasks.filter((task) => task.status === "todo").length,

      inProgress: tasks.filter((task) => task.status === "in-progress").length,

      completed: tasks.filter((task) => task.status === "completed").length,

      high: tasks.filter((task) => task.priority === "high").length,

      medium: tasks.filter((task) => task.priority === "medium").length,

      low: tasks.filter((task) => task.priority === "low").length,

      work: tasks.filter((task) => task.category === "work").length,

      personal: tasks.filter((task) => task.category === "personal").length,

      study: tasks.filter((task) => task.category === "study").length,

      other: tasks.filter((task) => task.category === "other").length,
    };
  }, [tasks]);

  //   const recentTasks = useMemo(() => {
  //     return [...tasks]
  //       .sort((a, b) => {
  //         if (!a.createdAt || !b.createdAt) return 0;

  //         return (
  //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         );
  //       })
  //       .slice(0, 5);
  //   }, [tasks]);

  const getStatusLabel = (status: Task["status"]) => {
    if (status === "in-progress") return "In Progress";
    if (status === "completed") return "Completed";
    return "Todo";
  };

  const getStatusClass = (status: Task["status"]) => {
    if (status === "completed") {
      return "border-green-300 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400";
    }

    if (status === "in-progress") {
      return "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400";
    }

    return "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  const getPriorityClass = (priority: Task["priority"]) => {
    if (priority === "high") {
      return "text-red-600 dark:text-red-400";
    }

    if (priority === "medium") {
      return "text-yellow-600 dark:text-yellow-400";
    }

    return "text-green-600 dark:text-green-400";
  };

  const categoryIcon = (category: Task["category"]) => {
    if (category === "work") return <Briefcase size={16} />;
    if (category === "personal") return <User size={16} />;
    if (category === "study") return <BookOpen size={16} />;

    return <MoreHorizontal size={16} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded-lg bg-muted" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-32 rounded-2xl bg-muted" />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-64 rounded-2xl bg-muted" />
              <div className="h-64 rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Welcome back <span className="animate-bounce">👋</span>
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here's an overview of your tasks and progress.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ListTodo size={20} />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Total
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold">{stats.total}</p>

            <p className="mt-1 text-sm text-muted-foreground">All tasks</p>
          </div>

          {/* Todo */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <Circle size={20} />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Todo
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold">{stats.todo}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Waiting to start
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Clock3 size={20} />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                In Progress
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold">{stats.inProgress}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Currently working
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <CheckCircle2 size={20} />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Completed
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold">{stats.completed}</p>

            <p className="mt-1 text-sm text-muted-foreground">Finished tasks</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Priority */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Priority Overview</h2>

                <p className="text-sm text-muted-foreground">
                  Tasks by priority
                </p>
              </div>

              <AlertCircle size={20} className="text-muted-foreground" />
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">High</span>

                  <span className={getPriorityClass("high")}>{stats.high}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width:
                        stats.total > 0
                          ? `${(stats.high / stats.total) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Medium</span>

                  <span className={getPriorityClass("medium")}>
                    {stats.medium}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width:
                        stats.total > 0
                          ? `${(stats.medium / stats.total) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Low</span>

                  <span className={getPriorityClass("low")}>{stats.low}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width:
                        stats.total > 0
                          ? `${(stats.low / stats.total) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-semibold">Categories</h2>

              <p className="text-sm text-muted-foreground">
                Tasks grouped by category
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "Work",
                  value: stats.work,
                  category: "work" as const,
                },
                {
                  name: "Personal",
                  value: stats.personal,
                  category: "personal" as const,
                },
                {
                  name: "Study",
                  value: stats.study,
                  category: "study" as const,
                },
                {
                  name: "Other",
                  value: stats.other,
                  category: "other" as const,
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border bg-background p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {categoryIcon(item.category)}

                    <span className="text-sm">{item.name}</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mt-6 rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="font-semibold">Recent Tasks</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest tasks
              </p>
            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="divide-y">
            {tasks.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  You don't have any tasks yet.
                </p>

                <button
                  onClick={() => navigate("/tasks")}
                  className="mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Create your first task
                </button>
              </div>
            ) : (
              tasks.slice(0, 3).map((task) => (
                <div
                  key={task._id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{task.title}</h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{task.category}</span>

                      <span>•</span>

                      <span
                        className={`font-semibold capitalize ${getPriorityClass(
                          task.priority,
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                      task.status,
                    )}`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
