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
import { CapitalizePipe } from '../../shared/pipes/captalize.pipe';
import { TaskService } from '../../services/task';
import { TaskStatusPipe } from '../../shared/pipes/task-status';
import { HighPriorityDirective } from '../../shared/directives/high-priority.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaskStatusPipe,
    HighPriorityDirective,
    CapitalizePipe
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  tasks: any[] = [];

  highPriorityCount = 0;
  dueThisWeekCount = 0;
  sprintProgress = 0;

  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    priority: ['Medium', Validators.required],
    department: ['', Validators.required],
    owner: ['', Validators.required],
    status: ['In Progress', Validators.required],
    dueDate: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.taskService.getTasks().subscribe({

      next: (data: any) => {

        console.log('Tasks Loaded:', data);

        this.tasks = data.map((task: any) => ({

          ...task,

          progress:
            task.status === 'Completed'
              ? 100
              : task.status === 'In Progress'
              ? 60
              : 20

        }));

        console.log('Mapped Tasks:', this.tasks);

        this.highPriorityCount =
          this.tasks.filter(
            (task: any) => task.priority === 'High'
          ).length;

        this.dueThisWeekCount =
          this.tasks.length;

        const completedTasks =
          this.tasks.filter(
            (task: any) =>
              task.status === 'Completed'
          ).length;

        this.sprintProgress =
          this.tasks.length > 0
            ? Math.round(
                (completedTasks / this.tasks.length) * 100
              )
            : 0;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('GET TASKS ERROR:', err);

      }

    });

  }

  addTask(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();
      return;

    }

    this.taskService
      .addTask(this.taskForm.value)
      .subscribe({

        next: () => {

          this.taskForm.reset({
            priority: 'Medium',
            status: 'In Progress'
          });

          this.loadTasks();

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error('ADD TASK ERROR:', err);

        }

      });

  }

  deleteTask(id: number): void {

    this.taskService
      .deleteTask(id)
      .subscribe({

        next: () => {

          this.loadTasks();

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error('DELETE TASK ERROR:', err);

        }

      });

  }

}