import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  tasks: any[] = [];

  highPriorityCount = 0;
  dueThisWeekCount = 0;
  sprintProgress = 0;

  newTask = {
    title: '',
    description: '',
    priority: 'Medium',
    department: '',
    owner: '',
    status: 'In Progress',
    goal: '',
    dueDate: ''
  };

  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);

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

    if (
      !this.newTask.title.trim() ||
      !this.newTask.description.trim() ||
      !this.newTask.department.trim() ||
      !this.newTask.owner.trim() ||
      !this.newTask.goal.trim() ||
      !this.newTask.dueDate
    ) {
      alert('Please fill all fields');
      return;
    }

    this.taskService.addTask(this.newTask).subscribe(() => {

      this.newTask = {
        title: '',
        description: '',
        priority: 'Medium',
        department: '',
        owner: '',
        status: 'In Progress',
        goal: '',
        dueDate: ''
      };

      this.loadTasks();

    });

  }

  deleteTask(id: number): void {

    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });

  }

}