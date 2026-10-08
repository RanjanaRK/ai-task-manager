import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";

const Tasks = () => {
  const handleTaskCreated = () => {
    // Later we will fetch tasks again here.
    console.log("Task created");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized.
          </p>
        </div>

        <CreateTaskDialog onTaskCreated={handleTaskCreated} />
      </div>
    </div>
  );
};

export default Tasks;
