import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  apiUrl = 'http://127.0.0.1:8000';

  getMembers() {
    return this.http.get(`${this.apiUrl}/members`);
  }

  addMember(member: any) {
    return this.http.post(`${this.apiUrl}/members`, member);
  }

  deleteMember(id: number) {
    return this.http.delete(`${this.apiUrl}/members/${id}`);
  }

  getMilestones() {
    return this.http.get(`${this.apiUrl}/milestones`);
  }

  addMilestone(data: any) {
    return this.http.post(`${this.apiUrl}/milestones`, data);
  }

  deleteMilestone(id: number) {
    return this.http.delete(`${this.apiUrl}/milestones/${id}`);
  }

  getTasks() {
    return this.http.get(`${this.apiUrl}/tasks`);
  }
}