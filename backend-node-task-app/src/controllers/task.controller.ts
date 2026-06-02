import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as taskService from "../services/task.service";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    const task = await taskService.createTask(
      title,
      description,
      priority,
      category,
      new Date(dueDate),
      req.userId!,
    );
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    console.log("Fetching tasks for user:", req.userId);
    const tasks = await taskService.getUserTasks(req.userId!);
    res.json({ success: true, data: tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.getTaskById(
      String(req.params.id),
      req.userId!,
    );
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.updateTask(
      String(req.params.id),
      req.userId!,
      req.body,
    );
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.deleteTask(
      String(req.params.id),
      req.userId!,
    );
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
