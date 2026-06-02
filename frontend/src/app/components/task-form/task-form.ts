import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { TaskType } from '../../types/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  imports: [FormsModule, DatePipe],
})
export class TaskForm implements OnInit {
  private taskService = inject(TaskService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  taskId: string | number | null = null;
  mode: 'Edit' | 'Add' = 'Add';

  task: TaskType = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: new Date(),
    category: 'work',
    status: 'pending',
  };

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.taskId = params['id'];
        this.mode = 'Edit';
        const existingTask = this.taskService.getById(this.taskId!);
        if (existingTask) {
          // Clone the task to avoid direct signal mutation
          this.task = { ...existingTask };
          // Ensure dueDate is a Date object for the input (though HTML5 date input needs YYYY-MM-DD string)
          if (this.task.dueDate) {
            this.task.dueDate = new Date(this.task.dueDate);
          }
        }
      }
    });
  }

  submitTask(): void {
    if (this.mode === 'Edit') {
      this.taskService.update(this.task);
    } else {
      const newTask = { ...this.task, id: Date.now() };
      this.taskService.add(newTask);
    }
    this.router.navigate(['/task/tasks']);
  }
}
