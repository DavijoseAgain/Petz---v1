// src/app/pages/horario/horario.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario',
  standalone: true,
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule, 
  ]
})
export class HorarioPage implements OnInit {
  shopName = '';
  service = '';
  shopLogo = '';
  selectedDate = '';

  // ← DECLARE petName, petTipo e petFoto
  petName = '';
  petTipo = '';
  petFoto = '';

  times: string[] = [
    '13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) params da rota: shopName, service e date
    this.shopName     = this.route.snapshot.paramMap.get('name') || '';
    this.service      = this.route.snapshot.paramMap.get('service')  || '';
    this.selectedDate = this.route.snapshot.paramMap.get('date')     || '';

    // 2) history.state: shopLogo, petName, petTipo, petFoto
    const hs = (history.state as any);
    this.shopLogo = hs.shopLogo || '';
    this.petName  = hs.petName  || '';
    this.petTipo  = hs.petTipo  || '';
    this.petFoto  = hs.petFoto  || '';

    console.log('HorarioPage → shopLogo:', this.shopLogo);
    console.log('HorarioPage → petFoto:', this.petFoto);
  }

  selectTime(time: string) {
    this.router.navigate(
  ['/confirmacao', this.shopName, this.service, this.selectedDate, time],
  {
    state: {
      shopLogo: this.shopLogo,
      petName:  this.petName,
      petTipo:  this.petTipo,
      petFoto:  this.petFoto
    }
  }
);

  }

  back() {
    this.router.navigate(
      ['/data-marcar', this.shopName, this.service],
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
