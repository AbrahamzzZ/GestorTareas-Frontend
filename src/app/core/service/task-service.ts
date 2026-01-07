import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`);
  }

  createTask(data: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, data);
  }

  updateTask(id: string, data: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${id}`, data);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
