import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Layout,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'tasks',
        loadComponent: () =>
          import('./pages/task-list/task-list')
            .then(m => m.TaskList)
      },

      {
        path: 'team-workspace',
        loadComponent: () =>
          import('./pages/team-workspace/team-workspace')
            .then(m => m.TeamWorkspace)
      },

      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics')
            .then(m => m.Analytics)
      },

      {
        path: 'project-center',
        loadComponent: () =>
          import('./pages/project-center/project-center')
            .then(m => m.ProjectCenter)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];