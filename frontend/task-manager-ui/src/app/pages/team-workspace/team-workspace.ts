import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-team-workspace',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './team-workspace.html',
  styleUrl: './team-workspace.css'
})
export class TeamWorkspace implements OnInit {

  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  members: any[] = [];

  searchText = '';

  memberForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    this.projectService
      .getMembers()
      .subscribe({

        next: (data: any) => {

          this.members = [...data];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  addMember(): void {

    if (this.memberForm.invalid) {

      this.memberForm.markAllAsTouched();
      return;

    }

    this.projectService
      .addMember(this.memberForm.value)
      .subscribe(() => {

        this.memberForm.reset();

        this.loadMembers();

      });

  }

  deleteMember(id: number): void {

    this.projectService
      .deleteMember(id)
      .subscribe(() => {

        this.loadMembers();

      });

  }

}