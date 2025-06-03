// src/app/pages/confirmacao/confirmacao.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Appointment {
  petName:   string;
  petTipo:   string;
  petFoto:   string;
  shopName:  string;
  shopLogo:  string;
  service:   string;
  date:      string;
  time:      string;
}

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ConfirmacaoPage implements OnInit {
  shopName     = '';
  service      = '';
  selectedDate = '';
  selectedTime = '';
  shopLogo     = '';

  petName = '';
  petTipo = '';
  petFoto = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1) Agora lemos “name” (porque a rota é confirmacao/:name/:service/:date/:time)
    this.shopName     = this.route.snapshot.paramMap.get('name')    || '';
    this.service      = this.route.snapshot.paramMap.get('service') || '';
    this.selectedDate = this.route.snapshot.paramMap.get('date')    || '';
    this.selectedTime = this.route.snapshot.paramMap.get('time')    || '';

    // 2) Valores passados por state
    const hs = (history.state as any);
    this.shopLogo = hs.shopLogo || '';
    this.petName  = hs.petName  || '';
    this.petTipo  = hs.petTipo  || '';
    this.petFoto  = hs.petFoto  || '';

    console.log('ConfirmacaoPage → shopName:', this.shopName);
    console.log('ConfirmacaoPage → shopLogo:', this.shopLogo);
    console.log('ConfirmacaoPage → petFoto:', this.petFoto);

    this.saveAppointment();
  }

  back() {
    this.router.navigate(
      ['/horario', this.shopName, this.service, this.selectedDate],
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

  private saveAppointment() {
    const app: Appointment = {
      petName:  this.petName,
      petTipo:  this.petTipo,
      petFoto:  this.petFoto,
      shopName: this.shopName,
      shopLogo: this.shopLogo,
      service:  this.service,
      date:     this.selectedDate,
      time:     this.selectedTime
    };

    const stored = localStorage.getItem('appointments');
    let arr: Appointment[] = [];
    if (stored) {
      try {
        arr = JSON.parse(stored) as Appointment[];
      } catch {
        arr = [];
      }
    }

    // Evita duplicatas
    const existe = arr.some(item =>
      item.petName  === app.petName  &&
      item.date     === app.date     &&
      item.time     === app.time     &&
      item.shopName === app.shopName
    );

    if (!existe) {
      arr.push(app);
      localStorage.setItem('appointments', JSON.stringify(arr));
    }
  }
}
