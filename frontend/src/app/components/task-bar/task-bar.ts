import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { Tabs } from '../../types/tabs';
import { TaskType } from '../../types/task';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-task-bar',
  standalone: true,
  imports: [TaskList],
  templateUrl: './task-bar.html',
  styleUrl: './task-bar.css',
})
export class TaskBar {
  private _taskService = inject(TaskService);

  constructor(private router: Router) {}
  currentTab: Tabs = 'all';

  // private
  onClickTab(tab: Tabs) {
    this.currentTab = tab;
  }

  get filteredTasks(): TaskType[] {
    if (this.currentTab === 'done') {
      return this._taskService.doneTasks();
    } else if (this.currentTab === 'notDone') {
      return this._taskService.notDoneTasks();
    }
    return this._taskService.tasks();
  }

  get counts() {
    return {
      all: this._taskService.tasks().length,
      done: this._taskService.doneTasks().length,
      notDone: this._taskService.notDoneTasks().length,
    };
  }

  removeTask(taskId: number | string) {
    console.log('Removing task:', taskId);
    this._taskService.removeById(taskId);
  }
  toggleCompleteTask(taskId: string | number) {
    console.log('Toggling task completion:', taskId);
    this._taskService.toggleComplete(taskId);
  }

  editTask(taskId: number) {
    console.log('Editing task:', taskId);
    this.router.navigate(['/task/task-form'], { queryParams: { id: taskId } });
  }
}
