import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { UserType } from '../../types/user';

interface RegisterUser extends UserType {
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private userService = inject(UserService);
  private router = inject(Router);

  protected user: RegisterUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  isLoading = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update((v) => !v);
  }

  async onSubmit(form: NgForm) {
    if (form.invalid || this.user.password !== this.user.confirmPassword) {
      return;
    }

    this.isLoading.set(true);
    const { confirmPassword, ...userData } = this.user;

    try {
      const response = await this.userService.register(userData);
      if (response) {
        // Success state could be added here
        this.router.navigate(['/auth/login']);
      } else {
        alert('Registration failed. Email might already be in use.');
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      this.isLoading.set(false);
    }
  }
}
