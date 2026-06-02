import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrls: ['./task.css'],
  imports: [RouterOutlet],
})
export class Task {
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.taskService.loadTasks();
  }
}
