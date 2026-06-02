import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config";
import User from "../models/User";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword, name });
  await user.save();
  return user;
};

export const register = async (
  email: string,
  password: string,
  name: string,
) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await createUser(email, password, name);
  return {
    msg: "User Created Successfully",
  };
};

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};
