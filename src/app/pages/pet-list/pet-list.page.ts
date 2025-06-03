// src/app/pages/pet-list/pet-list.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Appointment {
  petName: string;
  petTipo: string;
  petFoto: string;
  shopName: string;
  shopLogo: string;
  service: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-pet-list',
  standalone: true,
  templateUrl: './pet-list.page.html',
  styleUrls: ['./pet-list.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PetListPage implements OnInit {
  appointments: Appointment[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadAppointments();
  }

  back() {
    this.router.navigate(['/home']);
  }

  private loadAppointments() {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      try {
        this.appointments = JSON.parse(stored) as Appointment[];
      } catch {
        this.appointments = [];
      }
    } else {
      this.appointments = [];
    }
  }

  removeAppointment(index: number) {
    // Remove do array de appointments
    this.appointments.splice(index, 1);
    // Atualiza o localStorage
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
