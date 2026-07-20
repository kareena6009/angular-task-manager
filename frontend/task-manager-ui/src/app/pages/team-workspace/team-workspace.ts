import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-team-workspace',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './team-workspace.html',
  styleUrl: './team-workspace.css'
})
export class TeamWorkspace implements OnInit {

  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  members: any[] = [];

  searchText = '';

  newMember = {
    name: '',
    role: ''
  };

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    this.projectService.getMembers()
      .subscribe({
        next: (data: any) => {

          console.log('DATA RECEIVED', data);

          this.members = [...data];

          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error(err);
        }
      });

  }

  addMember(): void {

    if (
      !this.newMember.name.trim() ||
      !this.newMember.role.trim()
    ) {
      return;
    }

    this.projectService
      .addMember(this.newMember)
      .subscribe(() => {

        this.newMember = {
          name: '',
          role: ''
        };

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
