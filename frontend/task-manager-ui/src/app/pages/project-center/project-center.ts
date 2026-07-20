import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-project-center',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-center.html',
  styleUrl: './project-center.css'
})
export class ProjectCenter implements OnInit {

  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  milestones: any[] = [];

  newMilestone = {
    title: ''
  };

 ngOnInit(): void {

  setTimeout(() => {
    this.loadMilestones();
  }, 100);

}

  loadMilestones() {

    this.projectService
      .getMilestones()
      .subscribe((data: any) => {

        this.milestones = data;

        this.cdr.detectChanges();

      });

  }

  addMilestone() {

    this.projectService
      .addMilestone(this.newMilestone)
      .subscribe(() => {

        this.newMilestone = {
          title: ''
        };

        this.loadMilestones();

      });

  }

  deleteMilestone(id: number) {

    this.projectService
      .deleteMilestone(id)
      .subscribe(() => {

        this.loadMilestones();

      });

  }

}