// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',                redirectTo: 'login',             pathMatch: 'full' },
  { path: 'login',           loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register',        loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },
  { path: 'home',            loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'shop-list',       loadComponent: () => import('./pages/shop-list/shop-list.page').then(m => m.ShopListPage) },
  { path: 'pet-list',        loadComponent: () => import('./pages/pet-list/pet-list.page').then( m => m.PetListPage) },
  { path: 'perfil',          loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)},
  { path: 'cadastrar-pet',   loadComponent: () => import('./pages/cadastrar-pet/cadastrar-pet.page').then( m => m.CadastrarPetPage)},
  
  {
    path: 'escolha/:shopName',
    loadComponent: () => import('./pages/escolha/escolha.page').then(m => m.EscolhaPage)
  },

  //  ➜ Essa rota “marcar” deve esperar shopName e petName (via state ou param)
  {
    path: 'marcar/:shopName',
    loadComponent: () => import('./pages/marcar/marcar.page').then(m => m.MarcarPage)
  },

  {
    path: 'data-marcar/:name/:service',
    loadComponent: () => import('./pages/data-marcar/data-marcar.page').then(m => m.DataMarcarPage)
  },
  {
    path: 'horario/:name/:service/:date',
    loadComponent: () => import('./pages/horario/horario.page').then(m => m.HorarioPage)
  },
  {
    path: 'confirmacao/:name/:service/:date/:time',
    loadComponent: () => import('./pages/confirmacao/confirmacao.page').then(m => m.ConfirmacaoPage)
  },

  { path: '**', redirectTo: 'login' },
  

];

  
  
  
   


@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
