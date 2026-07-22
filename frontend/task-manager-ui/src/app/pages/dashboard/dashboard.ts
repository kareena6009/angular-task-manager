import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../services/task';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  today = new Date();

  totalTasks = signal(0);

  pendingTasks = signal(0);

  completedTasks = signal(0);

  highPriorityTasks = signal(0);

  totalMembers = 0;

  totalMilestones = 0;

  productivityScore = computed(() => {

    const total = this.totalTasks();
    const completed = this.completedTasks();

    return total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  });

  recentTasks: any[] = [];

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.taskService
      .getTasks()
      .subscribe((tasks: any) => {

        this.totalTasks.set(tasks.length);

        this.completedTasks.set(
          tasks.filter(
            (t: any) => t.status === 'Completed'
          ).length
        );

        this.pendingTasks.set(
          tasks.filter(
            (t: any) => t.status === 'Pending'
          ).length
        );

        this.highPriorityTasks.set(
          tasks.filter(
            (t: any) => t.priority === 'High'
          ).length
        );

        this.recentTasks = [...tasks]
          .reverse()
          .slice(0, 5);

        this.cdr.detectChanges();

      });

    this.projectService
      .getMembers()
      .subscribe((members: any) => {

        this.totalMembers = members.length;

        this.cdr.detectChanges();

      });

    this.projectService
      .getMilestones()
      .subscribe((milestones: any) => {

        this.totalMilestones = milestones.length;

        this.cdr.detectChanges();

      });

  }

}
