import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PetService, Pet } from 'src/app/services/pet.service';

@Component({
  selector: 'app-escolha',
  standalone: true,
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class EscolhaPage {
  shopName = '';        // nome da petshop vindo do param
  shopIconUrl = '';     // aqui guardaremos a imagem que veio via state
  pets: Pet[] = [];     // lista de pets do usuário

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {}

  async ionViewWillEnter() {
    // 1) pega o nome da petshop de param
    this.shopName = this.route.snapshot.paramMap.get('shopName') || '';

    // 2) lê o logo que veio via state do navegador (history.state)
    const hs = history.state as any;
    this.shopIconUrl = hs.shopLogo || 'assets/icon/default-shop.png';

    // 3) Carrega todos os pets cadastrados via PetService
    this.pets = await this.petService.getPets();
  }

  escolhePet(pet: Pet) {
    this.router.navigate(
      ['/marcar', this.shopName],
      {
        state: {
          petName: pet.nome,
          petTipo: pet.tipo,
          petFoto: pet.foto,
          shopLogo: this.shopIconUrl // repassamos também o shopLogo
        }
      }
    );
  }

  back() {
    this.router.navigate(['/shop-list']);
  }
}
