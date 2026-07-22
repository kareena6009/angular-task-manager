import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { TaskService } from '../../services/task';
import { TaskStatusPipe } from '../../shared/pipes/task-status';
import { HighPriorityDirective }
from '../../shared/directives/high-priority.directive';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule,TaskStatusPipe,HighPriorityDirective],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  tasks: any[] = [];

  highPriorityCount = 0;
  dueThisWeekCount = 0;
  sprintProgress = 0;

  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Medium', Validators.required],
    department: ['', Validators.required],
    owner: ['', Validators.required],
    status: ['In Progress', Validators.required],
    goal: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.taskService.getTasks().subscribe((data: any) => {

      this.tasks = data;

      this.highPriorityCount = data.filter(
        (task: any) => task.priority === 'High'
      ).length;

      this.dueThisWeekCount = data.length;

      const completedTasks = data.filter(
        (task: any) => task.status === 'Completed'
      ).length;

      this.sprintProgress =
        data.length > 0
          ? Math.round((completedTasks / data.length) * 100)
          : 0;

      this.cdr.detectChanges();

    });

  }

  addTask(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();
      return;

    }

    this.taskService
      .addTask(this.taskForm.value)
      .subscribe(() => {

        this.taskForm.reset({
          priority: 'Medium',
          status: 'In Progress'
        });

        this.loadTasks();

      });

  }

  deleteTask(id: number): void {

    this.taskService.deleteTask(id)
      .subscribe(() => {

        this.loadTasks();

      });

  }

}