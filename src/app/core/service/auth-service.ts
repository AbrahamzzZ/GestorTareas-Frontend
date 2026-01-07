import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../interface/login';
import { AuthResponse } from '../interface/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }
}
