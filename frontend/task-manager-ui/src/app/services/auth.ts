import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

login(username: string, password: string) {
  return this.http.post(
    'http://127.0.0.1:8000/login',
    {
      username,
      password
    }
  );
}
}