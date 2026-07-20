import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  getTasks() {
    return this.http.get('http://127.0.0.1:8000/tasks');
  }

  addTask(task: any) {
    return this.http.post(
      'http://127.0.0.1:8000/tasks',
      task
    );
  }
  deleteTask(id: number) {
  return this.http.delete(
    `http://127.0.0.1:8000/tasks/${id}`
  );
}
}