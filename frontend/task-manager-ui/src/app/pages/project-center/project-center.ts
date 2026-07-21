import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-project-center',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-center.html',
  styleUrl: './project-center.css'
})
export class ProjectCenter implements OnInit {

  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  milestones: any[] = [];

  milestoneForm = this.fb.group({
    title: ['', Validators.required]
  });

  ngOnInit(): void {

    setTimeout(() => {

      this.loadMilestones();

    }, 100);

  }

  loadMilestones(): void {

    this.projectService
      .getMilestones()
      .subscribe((data: any) => {

        this.milestones = data;

        this.cdr.detectChanges();

      });

  }

  addMilestone(): void {

    if (this.milestoneForm.invalid) {

      this.milestoneForm.markAllAsTouched();
      return;

    }

    this.projectService
      .addMilestone(this.milestoneForm.value)
      .subscribe(() => {

        this.milestoneForm.reset();

        this.loadMilestones();

      });

  }

  deleteMilestone(id: number): void {

    this.projectService
      .deleteMilestone(id)
      .subscribe(() => {

        this.loadMilestones();

      });

  }

}