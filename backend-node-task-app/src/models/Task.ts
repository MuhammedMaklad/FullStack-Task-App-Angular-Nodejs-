import mongoose, { Document, Schema } from "mongoose";

/**
 *   id?: number;
  title: string;
  description: string;
  priority: 'low' | 'high' | 'medium';
  dueDate: Date;
  category: 'work' | 'personal' | 'study';
  completed?: boolean;
 * */
export interface ITaskDocument extends Document {
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "high" | "medium";
  category: "work" | "personal" | "study";
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "high", "medium"],
      required: true,
    },
    category: {
      type: String,
      enum: ["work", "personal", "study"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Task = mongoose.model<ITaskDocument>("Task", taskSchema);

export default Task;
