import Task from "../models/Task";

export const createTask = async (
  title: string,
  description: string | undefined,
  priority: "low" | "high" | "medium",
  category: "work" | "personal" | "study",
  dueDate: Date,
  userId: string,
) => {
  const task = new Task({
    title,
    description,
    priority,
    category,
    dueDate,
    userId,
  });
  return await task.save();
};

export const getUserTasks = async (userId: string) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};

export const getTaskById = async (taskId: string, userId: string) => {
  return await Task.findOne({ _id: taskId, userId });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  updates: Partial<{
    title: string;
    description: string;
    status: "pending" | "completed";
    priority: "low" | "high" | "medium";
    category: "work" | "personal" | "study";
    dueDate: Date;
  }>,
) => {
  return await Task.findOneAndUpdate({ _id: taskId, userId }, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  return await Task.findOneAndDelete({ _id: taskId, userId });
};
