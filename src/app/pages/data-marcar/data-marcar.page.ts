// src/app/pages/data-marcar/data-marcar.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-marcar',
  standalone: true,
  templateUrl: './data-marcar.page.html',
  styleUrls: ['./data-marcar.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule, 
  ]
})
export class DataMarcarPage implements OnInit {
  shopName = '';
  service = '';
  shopLogo = '';
  
  //← DECLARE também petName, petTipo e petFoto para repassar adiante
  petName = '';
  petTipo = '';
  petFoto = '';

  dates: string[] = [
    '03/04','04/04','06/04','07/04',
    '08/04','09/04','10/04','11/05'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) pegue shopName e service dos params de rota:
    this.shopName = this.route.snapshot.paramMap.get('name') || '';
    this.service  = this.route.snapshot.paramMap.get('service')  || '';

    // 2) leia history.state, que deve conter shopLogo, petName, petTipo e petFoto
    const hs = (history.state as any);
    this.shopLogo = hs.shopLogo || '';
    this.petName  = hs.petName  || '';
    this.petTipo  = hs.petTipo  || '';
    this.petFoto  = hs.petFoto  || '';

    console.log('DataMarcarPage → shopLogo:', this.shopLogo);
    console.log('DataMarcarPage → petFoto:', this.petFoto);
  }

  selectDate(date: string) {
    // Ao escolher data, repasse tudo para HorarioPage
    this.router.navigate(
      ['/horario', this.shopName, this.service, date],
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
    // Se voltar, repasse logo e dados do pet para MarcarPage
    this.router.navigate(
      ['/marcar', this.shopName],
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
}
