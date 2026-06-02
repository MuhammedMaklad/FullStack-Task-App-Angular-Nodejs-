import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
  priority: z.enum(['low', 'high', 'medium']),
  category: z.enum(['work', 'personal', 'study']),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date format'),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
  priority: z.enum(['low', 'high', 'medium']).optional(),
  category: z.enum(['work', 'personal', 'study']).optional(),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date format').optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;