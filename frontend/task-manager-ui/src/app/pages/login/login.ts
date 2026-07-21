import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ]
  });

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;

    }

    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    this.auth
      .login(username, password)
      .subscribe((response: any) => {

        if (response.success) {

          alert('Login Successful');

          this.router.navigate(['/dashboard']);

        } else {

          alert('Invalid Credentials');

        }

      });

  }

}