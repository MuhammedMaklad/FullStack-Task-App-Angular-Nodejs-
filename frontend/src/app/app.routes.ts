import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Notfound } from './components/notfound/notfound';
import { Register } from './components/register/register';
import { Slider } from './components/slider/slider';
import { Task } from './components/Task/task';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Slider,
  },
  {
    path: 'task',
    component: Task,
    canActivate: [authGuard],
    children: [
      {
        path: 'task-form',
        // component: TaskForm,
        loadComponent: () => import('./components/task-form/task-form').then((m) => m.TaskForm),
      },
      {
        path: 'tasks',
        // component: TaskBar,
        loadComponent: () => import('./components/task-bar/task-bar').then((m) => m.TaskBar),
      },
      {
        path: '**',
        component: Notfound,
      },
    ],
  },
  {
    path: 'auth',
    // redirectTo: 'login',
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: '**',
    component: Notfound,
  },
];
