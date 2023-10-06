import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  register(fullName: string, email: string, password: string): Observable<any> {
    const body = { fullName, email, password }
    return this.http.post(this.apiUrl + 'signup', body)
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }
    return this.http.post(this.apiUrl + 'login', body)
  }
  isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage();
    return !!token;
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }
}
