import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TaskType } from '../types/task';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly URL: string = 'http://localhost:3000/api/tasks';

  private httpClient = inject(HttpClient);
  private storageService = inject(LocalStorageService);

  private readonly userId: string | null = this.storageService.getItem<string>('id');
  private _tasks = signal<TaskType[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor() {

  }

  loadTasks() {
    if (this.userId) {
      this.httpClient.get<{ success: boolean; data: TaskType[] }>(`${this.URL}`).subscribe({
        next: (response) => {
          if (response.success) {
            this._tasks.set(response['data']);
          }
        },
        error: (err) => console.error('Failed to load tasks', err),
      });
    }
  }

  readonly doneTasks = computed(() => {
    return this._tasks().filter((task) => task.status === 'completed');
  });

  readonly notDoneTasks = computed(() => {
    return this._tasks().filter((task) => task.status === 'pending');
  });

  getById(taskId: string | number) {
    return this._tasks().find((task) => task.id == taskId);
  }

  add(task: Omit<TaskType, 'id'>) {
    const newTask = { ...task, status: 'pending' };

    this.httpClient.post<{ success: boolean; data: TaskType }>(this.URL, newTask).subscribe({
      next: (response) => {
        if (response.success) {
          this._tasks.update((prev) => [...prev, response['data']]);
        }
      },
      error: (err) => console.error('Failed to add task', err),
    });
  }

  removeById(taskId: number | string) {
    this.httpClient.delete(`${this.URL}/${taskId}`).subscribe({
      next: () => {
        this._tasks.update((prev) => prev.filter((task) => task.id !== taskId));
      },
      error: (err) => console.error('Failed to delete task', err),
    });
  }

  toggleComplete(taskId: number | string) {
    const task = this.getById(taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      this.update({ ...task, status: newStatus });
    }
  }

  update(updatedTask: TaskType) {
    this.httpClient
      .patch<{ success: boolean; data: TaskType }>(`${this.URL}/${updatedTask.id}`, updatedTask)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this._tasks.update((prev) =>
              prev.map((task) =>
                task.id == response['data'].id ? { ...task, ...response['data'] } : task,
              ),
            );
          }
        },
        error: (err) => console.error('Failed to update task', err),
      });
  }
}
