import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskType } from '../../types/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList {
  @Input({ required: true }) tasks: TaskType[] = [];

  @Output() toggleComplete = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<number>();

  onToggle(id?: number): void {
    if (id !== undefined) {
      this.toggleComplete.emit(id);
      console.log(`where from task list component task with-${id}`);
    }
  }

  onEdit(id?: number): void {
    if (id !== undefined) {
      this.editTask.emit(id);
      console.log(`where from task list component task with-${id}`);
    }
  }

  onDelete(id?: number): void {
    if (id !== undefined) {
      this.deleteTask.emit(id);
      console.log(`where from task list component task with-${id}`);
    }
  }
}
