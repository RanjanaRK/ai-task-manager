const tools = [
  {
    type: "function",
    name: "create_task",
    description: "Create a new task for the authenticated user",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the task",
        },

        description: {
          type: "string",
          description: "Optional description of the task",
        },

        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Priority of the task",
        },

        status: {
          type: "string",
          enum: ["todo", "in-progress", "completed"],
          description: "Current status of the task",
        },

        category: {
          type: "string",
          enum: ["work", "personal", "study", "other"],
          description: "Category of the task",
        },

        dueDate: {
          type: "string",
          description: "Due date of the task in YYYY-MM-DD format",
        },
      },

      required: ["title"],
    },
  },

  {
    type: "function",
    name: "get_tasks",
    description: "Get tasks belonging to the authenticated user",
    parameters: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["todo", "in-progress", "completed"],
          description: "Filter tasks by status",
        },

        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Filter tasks by priority",
        },

        category: {
          type: "string",
          enum: ["work", "personal", "study", "other"],
          description: "Filter tasks by category",
        },
      },
    },
  },

  // UPDATE
  {
    type: "function",
    name: "update_task",
    description: "Update an existing task belonging to the authenticated user",
    parameters: {
      type: "object",
      properties: {
        taskId: {
          type: "string",
          description: "The ID of the task to update",
        },
        title: {
          type: "string",
          description: "New title of the task",
        },
        description: {
          type: "string",
          description: "New description of the task",
        },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "New priority of the task",
        },
        status: {
          type: "string",
          enum: ["todo", "in-progress", "completed"],
          description: "New status of the task",
        },
        category: {
          type: "string",
          enum: ["work", "personal", "study", "other"],
          description: "New category of the task",
        },
        dueDate: {
          type: "string",
          description: "New due date in YYYY-MM-DD format",
        },
      },
      required: ["taskId"],
    },
  },

  // DELETE
  {
    type: "function",
    name: "delete_task",
    description: "Delete an existing task belonging to the authenticated user",
    parameters: {
      type: "object",
      properties: {
        taskId: {
          type: "string",
          description: "The ID of the task to delete",
        },
      },
      required: ["taskId"],
    },
  },
];

export default tools;
