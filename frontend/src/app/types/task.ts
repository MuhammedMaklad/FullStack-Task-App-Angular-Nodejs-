export interface TaskType {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'high' | 'medium';
  dueDate: Date;
  category: 'work' | 'personal' | 'study';
  status: 'pending' | 'completed';
}
