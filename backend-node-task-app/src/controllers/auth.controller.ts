import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { findUserById, login, register } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const { msg } = await register(email, password, name);
    res.status(201).json({
      success: true,
      msg,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await findUserById(req.userId!);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
