// src/app/pages/marcar/marcar.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcar',
  standalone: true,
  templateUrl: './marcar.page.html',
  styleUrls: ['./marcar.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule, 
  ]
})
export class MarcarPage implements OnInit {
  shopName = '';
  shopLogo = '';

  // ← DECLARE as propriedades que vieram de EscolhaPage
  petName = '';
  petTipo = '';
  petFoto = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) pega shopName da rota:
    this.shopName = this.route.snapshot.paramMap.get('shopName') || '';

    // 2) lê history.state, incluindo petName, petTipo, petFoto e shopLogo:
    const hs = (history.state as any);
    this.petName  = hs.petName  || '';
    this.petTipo  = hs.petTipo  || '';
    this.petFoto  = hs.petFoto  || '';    // ◀︎ aqui: foto do pet
    this.shopLogo = hs.shopLogo || '';
    
    console.log('MarcarPage → shopLogo:', this.shopLogo);
    console.log('MarcarPage → petFoto:', this.petFoto);
  }

  // Quando o usuário escolhe um serviço, precisamos repassar TUDO para DataMarcarPage
  choose(service: string) {
    this.router.navigate(
      ['/data-marcar', this.shopName, service],
      {
        state: {
          shopLogo: this.shopLogo,
          petName: this.petName,
          petTipo: this.petTipo,
          petFoto: this.petFoto
        }
      }
    );
  }

  back() {
    // Caso o usuário volte para a tela anterior, repassamos logo e pet também
    this.router.navigate(['/escolha', this.shopName], {
      state: {
        shopLogo: this.shopLogo
      }
    });
  }
}
