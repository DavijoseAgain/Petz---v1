import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginPage {
  usuario = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    const ok = await this.authService.login(this.usuario, this.senha);
    if (ok) {
      this.router.navigate(['/home']);
    } else {
      alert('Usuário ou senha incorretos.');
    }
  }
}