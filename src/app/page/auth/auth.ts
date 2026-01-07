import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth-service';
import { TokenService } from '../../core/service/token-service';
import { MaterialModule } from '../../shared/ui/material-module';

@Component({
  selector: 'app-auth',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  loading = false;
  errorMessage = '';
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });


  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value as any).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Email o contraseña incorrectos';
        this.loading = false;
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
