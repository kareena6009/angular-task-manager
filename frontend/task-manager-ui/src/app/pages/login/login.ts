import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {

    this.auth.login(
      this.username,
      this.password
    ).subscribe((response: any) => {

      if (response.success) {

        alert('Login Successful');

        this.router.navigate(['/dashboard']);

      } else {

        alert('Invalid Credentials');

      }

    });

  }

}