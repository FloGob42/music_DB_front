import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Users } from '../models/users.models';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  private readonly baseUrl = 'http://127.0.0.1:8000/auth/'

  constructor(private _http: HttpClient, private router: Router) { }

  users: Users[] = []

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  register(user: Users): Observable<Users>{
    return this._http.post<Users>(
      `${this.baseUrl}register/`, user
    );
    
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}login/`, { username, password });
  }
  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('access_token'); // Check if the token exists
    }
    return false; // Default to not authenticated in non-browser environments
  }
  refreshToken(refresh: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}token_refresh/`, { refresh });
  }

  

  logout(): void {
    // Clear the tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Optionally notify the backend server
    this._http.post('/auth/logout', {}).subscribe();

    // Redirect to the login page
    this.router.navigate(['/user/login']);
  }
}
