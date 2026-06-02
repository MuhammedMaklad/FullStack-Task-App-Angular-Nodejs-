import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { UserType } from '../types/user';
import { LocalStorageService } from './local-storage-service';

interface RegisterUserResponse {
  success: boolean;
  msg: string;
}
interface LoginUserResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly URL: string = 'http://localhost:3000/api';
  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);
  private storageService = inject(LocalStorageService);

  // Reactive state
  private _user = signal<LoginUserResponse['user'] | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => {
    this._user();
    return !!this.cookieService.get('auth_token');
  });

  async register(user: UserType) {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<RegisterUserResponse>(`${this.URL}/auth/register`, user),
      );
      return response.success;
    } catch (error) {
      this.handleError(error, 'Registration failed');
    }
  }

  async login(credentials: Partial<UserType>) {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<LoginUserResponse>(`${this.URL}/auth/login`, credentials),
      );

      if (response.success && response.token) {
        this.cookieService.set('auth_token', response.token, {
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        this.storageService.setItem('id', response.user.id);
        this._user.set(response.user);
        return response.user;
      }
      return null;
    } catch (error) {
      // this.handleError(error, 'Login failed');
      return null;
    }
  }

  logout() {
    this.cookieService.delete('auth_token', '/');
    this.storageService.removeItem('id');
    this._user.set(null);
  }

  private handleError(error: unknown, context: string): never {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          console.error(`${context}: Bad request`, error.error);
          break;
        case 401:
          console.error(`${context}: Unauthorized`, error.error);
          break;
        case 409:
          console.error(`${context}: Conflict - User may already exist`, error.error);
          break;
        case 0:
          console.error(`${context}: Network error or CORS issue`);
          break;
        default:
          console.error(`${context}: Server error`, error.error);
      }
    } else {
      console.error(`${context}: Unexpected error`, error);
    }

    throw error; // TypeScript infers this as never due to throw
  }
}
