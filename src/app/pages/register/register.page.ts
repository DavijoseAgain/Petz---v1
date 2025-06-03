// src/app/pages/register/register.page.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RegisterPage {
  usuario = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    if (this.senha !== this.confirmarSenha) {
      alert('Senhas não conferem.');
      return;
    }
    await this.authService.register(this.usuario, this.senha);
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
