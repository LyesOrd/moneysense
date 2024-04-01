import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface ApplicationUser {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject!: BehaviorSubject<ApplicationUser | null>;
  public currentUser!: Observable<ApplicationUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    console.log('logout');
    console.log(this.currentUserSubject, 'currentUserSubject');
    this.currentUserSubject.next(null);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, {
      username,
      email,
      password,
    });
  }
}
