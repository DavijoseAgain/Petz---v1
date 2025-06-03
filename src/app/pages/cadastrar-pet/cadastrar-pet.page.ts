// src/app/pages/cadastrar-pet/cadastrar-pet.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PetService, Pet } from 'src/app/services/pet.service';

@Component({
  selector: 'app-cadastrar-pet',
  templateUrl: './cadastrar-pet.page.html',
  styleUrls: ['./cadastrar-pet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CadastrarPetPage implements OnInit {
  nome: string = '';
  idade: number | null = null;
  sexo: string = '';
  descricao: string = '';
  foto: string = '';

  constructor(
    private petService: PetService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
   
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.foto = reader.result as string; // base64
    };
    reader.readAsDataURL(file);
  }

  async salvarPet() {
    if (!this.nome || this.idade === null || !this.sexo) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, preencha nome, idade e sexo do pet.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const novoPet: Pet = {
      nome: this.nome,
      idade: this.idade,
      sexo: this.sexo,
      descricao: this.descricao,
      foto: this.foto || 'assets/icon/avatar-placeholder.png',
      tipo: this.detectarTipo(this.descricao)
    };

    await this.petService.addPet(novoPet);

    const toast = await this.toastCtrl.create({
      message: 'Pet cadastrado com sucesso!',
      duration: 1500,
      color: 'success'
    });
    await toast.present();

    // Volta para a página de Perfil usando Router.navigate
    this.router.navigate(['/home']);
  }

  private detectarTipo(desc: string): string {
    if (desc.toLowerCase().includes('cachorro')) {
      return 'Cachorro';
    }
    if (desc.toLowerCase().includes('gato')) {
      return 'Gato';
    }
    return 'Outro';
  }
}
