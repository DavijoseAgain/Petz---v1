import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, Perfil } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class PerfilPage implements OnInit {
  nome: string = '';
  idade: number | null = null;
  sexo: string = '';
  foto: string = '';

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    // Recupera o objeto completo (incluindo usuário e senha, se já tiver salvo)
    const user: Perfil | null = await this.auth.getUser();
    if (user) {
      this.nome = user.nome || '';
      this.idade = user.idade ?? null;
      this.sexo = user.sexo || '';
      this.foto = user.foto || '';
    }
  }

  async salvar() {
    await this.auth.saveProfile({
      nome: this.nome,
      idade: this.idade ?? undefined,
      sexo: this.sexo,
      foto: this.foto
    });
    // Opcional: mostrar um Toast ou alert de "Salvo com sucesso"
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.foto = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
