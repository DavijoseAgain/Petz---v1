// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Perfil {
  usuario?: string;
  senha?: string;
  nome?: string;
  idade?: number;
  sexo?: string;
  foto?: string; // base64 ou URL
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'user';

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  /**
   * Registra um usuário apenas com usuário e senha.
   */
  async register(usuario: string, senha: string): Promise<void> {
    const user: Perfil = { usuario, senha };
    await this._storage?.set(this.STORAGE_KEY, user);
  }

  /**
   * Faz login checando usuário e senha.
   */
  async login(usuario: string, senha: string): Promise<boolean> {
    const user: Perfil | null = await this._storage?.get(this.STORAGE_KEY);
    return user?.usuario === usuario && user?.senha === senha;
  }

  /**
   * Retorna o objeto completo (perfil + usuário/senha) armazenado.
   * Se não houver, retorna null.
   */
  async getUser(): Promise<Perfil | null> {
    return this._storage ? (await this._storage.get(this.STORAGE_KEY)) : null;
  }

  /**
   * Atualiza apenas os campos de perfil (nome, idade, sexo, foto),
   * fazendo merge com usuário e senha já existentes no storage.
   */
  async saveProfile(profileData: {
    nome?: string;
    idade?: number;
    sexo?: string;
    foto?: string;
  }): Promise<void> {
    // Pega o objeto já gravado (usuario + senha + possivelmente outros campos)
    const existing: Perfil | null = await this.getUser();
    const merged: Perfil = {
      usuario: existing?.usuario,
      senha: existing?.senha,
      nome: profileData.nome ?? existing?.nome,
      idade: profileData.idade ?? existing?.idade,
      sexo: profileData.sexo ?? existing?.sexo,
      foto: profileData.foto ?? existing?.foto
    };
    await this._storage?.set(this.STORAGE_KEY, merged);
  }

  /**
   * (Opcional) Limpa todos os dados do usuário.
   */
  async clearUser(): Promise<void> {
    await this._storage?.remove(this.STORAGE_KEY);
  }
}
