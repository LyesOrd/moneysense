import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn = this.userService.isLoggedIn();
  @ViewChild('hamburger')
  hamburger!: ElementRef<HTMLElement>;
  @ViewChild('menubar')
  menubar!: ElementRef<HTMLElement>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    if (this.hamburger && this.menubar) {
      this.hamburger.nativeElement.addEventListener('click', () =>
        this.toggleNav()
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  toggleNav(): void {
    this.menubar.nativeElement.classList.toggle('active');
    this.hamburger.nativeElement.classList.toggle('hamburger-active');
  }
}
