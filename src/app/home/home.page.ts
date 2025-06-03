// src/app/pages/home/home.page.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService, Perfil } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {
  usuario: string = '';
  foto: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  // Chamado toda vez que a página vai ficar visível (navegação para cá, pop, tab etc.)
  async ionViewWillEnter() {
    const user: Perfil | null = await this.auth.getUser();
    this.usuario = user?.nome || 'usuário';
    this.foto = user?.foto || '';
  }

  openProfile() {
    this.router.navigate(['/perfil']);
  }
}
