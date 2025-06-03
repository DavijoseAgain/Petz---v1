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
    // 1) Verifica se todos os campos estão preenchidos
    if (!this.usuario || !this.email || !this.senha || !this.confirmarSenha) {
      alert('Preencha todos os campos.');
      return;
    }

    // 2) Valida formato de e-mail
    if (!this.validarEmail(this.email)) {
      alert('E-mail inválido. Use o formato email@exemplo.com.');
      return;
    }

    // 3) Verifica tamanho mínimo da senha
    if (this.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // 4) Verifica se senhas conferem
    if (this.senha !== this.confirmarSenha) {
      alert('Senhas não conferem.');
      return;
    }

    // 5) Se tudo estiver ok, chama o serviço de cadastro
    try {
      await this.authService.register(this.usuario, this.senha);
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  }

  private validarEmail(email: string): boolean {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
  }
}
