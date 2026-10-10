import { Bot, CalendarDays, Check, Send, Trash2 } from "lucide-react";
import { useState } from "react";

import api from "@/lib/axios";
import VoiceInput from "../ai/VoiceInput";

type TaskData = {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  category: "work" | "personal" | "study" | "other";
  dueDate?: string | null;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  task?: TaskData;
  tasks?: TaskData[];
};

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi 👋! I'm your AI task assistant. You can create or view tasks using English, Hindi, Bengali, or Hinglish.",
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await api.post(
        "/ai/chat",
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      console.log("AI frontend response:", data);

      const assistantMessage: Message = {
        id: `${Date.now()}-ai`,
        role: "assistant",
        content: data.result?.message || data.message || "Done!",
        task: data.result?.task || undefined,
        tasks: data.result?.tasks || undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("AI chat error:", error);

      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content:
          error.response?.data?.message ||
          error.message ||
          "Sorry, something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([welcomeMessage]);
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) {
      return "No due date";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPriorityClasses = (priority: TaskData["priority"]) => {
    if (priority === "high") {
      return "border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300";
    }

    if (priority === "medium") {
      return "border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300";
    }

    return "border-green-300 bg-green-100 text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300";
  };

  const getStatusClasses = (status: TaskData["status"]) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300";
    }

    if (status === "in-progress") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="bg-background min-h-[calc(100vh-64px)]">
      <div className="mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Bot size={22} />
            </div>

            <div>
              <h1 className="font-semibold">AI Task Assistant</h1>

              <p className="text-xs text-muted-foreground">
                Create and manage tasks with natural language
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted"
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">Clear</span>
          </button>
        </div> */}

        {/* Chat Area */}
        <div className="flex-1 space-y-5 overflow-y-auto py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* USER MESSAGE */}
              {message.role === "user" && (
                <div className="bg-primary text-primary-foreground max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[70%]">
                  {message.content}
                </div>
              )}

              {/* ASSISTANT MESSAGE */}
              {message.role === "assistant" && (
                <div className="w-full max-w-2xl">
                  {/* NORMAL AI MESSAGE */}
                  {message.content && (
                    <div className="mb-3 flex items-start gap-3">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                        <Bot size={17} />
                      </div>

                      <div className="bg-card rounded-2xl border px-4 py-3 text-sm shadow-sm">
                        {message.content}
                      </div>
                    </div>
                  )}

                  {/* CREATED TASK */}
                  {message.task && (
                    <div className="bg-card ml-0 w-full max-w-md rounded-2xl border p-4 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                          <Check size={16} />
                        </div>

                        <span className="text-sm font-semibold">
                          Task created successfully
                        </span>
                      </div>

                      <h3 className="mb-4 text-lg font-semibold">
                        {message.task.title}
                      </h3>

                      <div className="space-y-3 text-sm">
                        {/* Priority */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">
                            Priority
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getPriorityClasses(
                              message.task.priority,
                            )}`}
                          >
                            {message.task.priority}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">Status</span>

                          <span className="font-medium capitalize">
                            {message.task.status.replace("-", " ")}
                          </span>
                        </div>

                        {/* Category */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">
                            Category
                          </span>

                          <span className="font-medium capitalize">
                            {message.task.category}
                          </span>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            Due Date
                          </span>

                          <span className="font-medium">
                            {formatDate(message.task.dueDate)}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      {message.task.description && (
                        <div className="mt-4 border-t pt-4">
                          <p className="text-muted-foreground text-xs">
                            Description
                          </p>

                          <p className="mt-1 text-sm">
                            {message.task.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ALL TASKS */}
                  {message.tasks && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                          <Bot size={17} />
                        </div>

                        <p className="text-sm font-semibold">
                          {message.tasks.length}{" "}
                          {message.tasks.length === 1 ? "task" : "tasks"} found
                        </p>
                      </div>

                      {message.tasks.length === 0 ? (
                        <div className="bg-card rounded-2xl border p-6 text-center shadow-sm">
                          <p className="text-muted-foreground text-sm">
                            You don't have any tasks yet.
                          </p>
                        </div>
                      ) : (
                        message.tasks.map((task) => (
                          <div
                            key={task._id}
                            className="bg-card rounded-2xl border p-4 shadow-sm transition hover:shadow-md"
                          >
                            {/* Task Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="font-semibold">{task.title}</h3>

                                {task.description && (
                                  <p className="text-muted-foreground mt-1 text-sm">
                                    {task.description}
                                  </p>
                                )}
                              </div>

                              {/* Priority */}
                              <span
                                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getPriorityClasses(
                                  task.priority,
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            {/* Task Details */}
                            <div className="mt-4 flex flex-wrap gap-2 text-xs">
                              {/* Status */}
                              <span
                                className={`rounded-full px-2.5 py-1 capitalize ${getStatusClasses(
                                  task.status,
                                )}`}
                              >
                                {task.status.replace("-", " ")}
                              </span>

                              {/* Category */}
                              <span className="bg-muted rounded-full px-2.5 py-1 capitalize">
                                {task.category}
                              </span>

                              {/* Due Date */}
                              {task.dueDate && (
                                <span className="bg-muted flex items-center gap-1 rounded-full px-2.5 py-1">
                                  <CalendarDays size={13} />

                                  {formatDate(task.dueDate)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-card text-muted-foreground flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-current" />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-current"
                  style={{
                    animationDelay: "150ms",
                  }}
                />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-current"
                  style={{
                    animationDelay: "300ms",
                  }}
                />

                <span className="ml-1">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="pt-4">
          <div className="bg-card flex items-center gap-2 rounded-2xl border p-2 shadow-sm">
            <VoiceInput
              onTranscript={(text) => {
                setInput((prev) => (prev.trim() ? `${prev} ${text}` : text));
              }}
              disabled={loading}
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me to create or view a task..."
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
              disabled={loading}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          <p className="text-muted-foreground mt-2 text-center text-xs">
            Supports English, Hindi, Bengali and Hinglish
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
