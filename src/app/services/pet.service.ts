// src/app/services/pet.service.ts

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Pet {
  nome: string;
  idade: number;
  sexo: string;
  descricao: string;
  foto: string; // base64 ou URL
  tipo: string; // opcionalmente, você pode usar este campo para distinguir “Cachorro”, “Gato” etc.
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'meu_app_pets';

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  /**
   * Retorna a lista completa de pets (ou array vazio, se não houver nenhum).
   */
  async getPets(): Promise<Pet[]> {
    const list = await this._storage?.get(this.STORAGE_KEY);
    return list ? (list as Pet[]) : [];
  }

  /**
   * Adiciona um novo pet à lista e grava no Storage.
   */
  async addPet(pet: Pet): Promise<void> {
    const todos = (await this.getPets()) || [];
    todos.push(pet);
    await this._storage?.set(this.STORAGE_KEY, todos);
  }

  /**
   * Opcional: limpar todos os pets (usado só para debug/testes).
   */
  async clearPets(): Promise<void> {
    await this._storage?.remove(this.STORAGE_KEY);
  }
}
