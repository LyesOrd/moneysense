import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>(''),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  hide = true;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {
    merge(
      this.form['controls']['email'].statusChanges,
      this.form['controls']['email'].valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updatedErrorMessage();
      });
  }

  updatedErrorMessage() {
    if (this.form['controls']['email'].hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.form['controls']['email'].hasError('email')) {
      this.errorMessage = 'Not a valid email';
    }
  }

  submit(): void {
    if (this.form.valid) {
      const email = this.form['controls']['email'].value;
      const password = this.form['controls']['password'].value;

      this.authService.login(email, password).subscribe({
        complete: () => {
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          this.isLoginFailed = true;
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
