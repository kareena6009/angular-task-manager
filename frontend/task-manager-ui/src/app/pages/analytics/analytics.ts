import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  private service = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  totalTasks = 0;
  totalMembers = 0;
  totalMilestones = 0;

  completedTasks = 0;
  pendingTasks = 0;

  completionRate = 0;

  ngOnInit(): void {

  setTimeout(() => {
    this.loadAnalytics();
  }, 100);

}

  loadAnalytics() {

    this.service.getTasks()
      .subscribe((tasks: any) => {

        this.totalTasks = tasks.length;

        this.completedTasks =
          tasks.filter(
            (t: any) => t.status === 'Completed'
          ).length;

        this.pendingTasks =
          tasks.filter(
            (t: any) => t.status !== 'Completed'
          ).length;

        this.completionRate =
          this.totalTasks > 0
            ? Math.round(
                (this.completedTasks / this.totalTasks) * 100
              )
            : 0;

        this.cdr.detectChanges();

      });

    this.service.getMembers()
      .subscribe((members: any) => {

        this.totalMembers = members.length;

        this.cdr.detectChanges();

      });

    this.service.getMilestones()
      .subscribe((milestones: any) => {

        this.totalMilestones = milestones.length;

        this.cdr.detectChanges();

      });

  }

}