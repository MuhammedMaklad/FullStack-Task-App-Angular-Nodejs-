import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class Header {
  private userService = inject(UserService);
  private router = inject(Router);

  // Directly expose the reactive signal to the template
  isAuth = this.userService.isAuthenticated;

  onClickLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
