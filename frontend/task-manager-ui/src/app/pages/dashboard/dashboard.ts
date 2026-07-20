import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { TaskService } from '../../services/task';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;
  highPriorityTasks = 0;

  totalMembers = 0;
  totalMilestones = 0;

  productivityScore = 0;

  recentTasks: any[] = [];

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.taskService
      .getTasks()
      .subscribe((tasks: any) => {

        this.totalTasks = tasks.length;

        this.completedTasks =
          tasks.filter(
            (t: any) => t.status === 'Completed'
          ).length;

        this.pendingTasks =
          tasks.filter(
            (t: any) => t.status === 'Pending'
          ).length;

        this.highPriorityTasks =
          tasks.filter(
            (t: any) => t.priority === 'High'
          ).length;

        this.productivityScore =
          this.totalTasks > 0
            ? Math.round(
                (this.completedTasks / this.totalTasks) * 100
              )
            : 0;

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