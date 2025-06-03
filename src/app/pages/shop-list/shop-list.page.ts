// src/app/pages/shop-list/shop-list.page.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Shop {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-shop-list',
  standalone: true,
  templateUrl: './shop-list.page.html',
  styleUrls: ['./shop-list.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ShopListPage implements OnInit {
  search: string = '';
  shops: Shop[] = [
    { name: 'Lucy’s Pet Shop', logo: 'assets/icon/lucys-pet-shop.png' },
    { name: 'Borcelle Pet Shop', logo: 'assets/icon/borcelle.png' },
    { name: 'Pacheco Petshop', logo: 'assets/icon/pacheco.png'   },
    { name: 'PetDistrib', logo: 'assets/icon/PetDistrib.png'      },
    { name: 'Honey Pet', logo: 'assets/icon/honey-pet.png'         }
  ];
  filtered: Shop[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filtered = [...this.shops];
  }

  filter() {
    const q = this.search.trim().toLowerCase();
    this.filtered = this.shops.filter(s =>
      s.name.toLowerCase().includes(q)
    );
  }

  select(shop: Shop) {
  this.router.navigate(
    ['/escolha', shop.name],
    { 
      state: { 
        shopLogo: shop.logo   
      } 
    }
  );
  }
}
