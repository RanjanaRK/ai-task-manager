import { useState } from "react";

import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import TaskList from "@/components/tasks/TaskList";

const Tasks = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>

            <p className="text-muted-foreground mt-1 text-sm">
              Manage your tasks and stay organized.
            </p>
          </div>

          <CreateTaskDialog onTaskCreated={handleTaskCreated} />
        </div>

        {/* Task List */}
        <TaskList refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default Tasks;
