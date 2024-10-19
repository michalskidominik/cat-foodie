import { Injectable } from '@angular/core';

// Typy danych dla statusu kota
export type CatStatus =
  | 'niekastrowany'
  | 'kastrowany'
  | 'otyły'
  | 'odchudzanie'
  | 'intensywna terapia'
  | 'rekonwalescencja'
  | 'ruja'
  | 'ciąża'
  | 'wzrost'
  | 'laktacja1'
  | 'laktacja2'
  | 'laktacja3-4'
  | 'laktacja5-6';

@Injectable({
  providedIn: 'root',
})
export class CatDataService {
  private calculateRER(weight: number): number {
    return 70 * Math.pow(weight, 0.67);
  }

  calculateDER(weight: number, status: CatStatus): number {
    const rer = this.calculateRER(weight);
    let kFactor = 1; // Domyślna wartość K

    // Określenie wartości K na podstawie statusu kota
    switch (status) {
      case 'niekastrowany':
        kFactor = 1.4;
        break;
      case 'kastrowany':
        kFactor = 1.2;
        break;
      case 'otyły':
        kFactor = 1.0;
        break;
      case 'odchudzanie':
        kFactor = 0.8;
        break;
      case 'intensywna terapia':
        kFactor = 1.0;
        break;
      case 'rekonwalescencja':
        kFactor = 1.2; // Można dostosować w przedziale 1.2-1.4
        break;
      case 'ruja':
        kFactor = 1.6;
        break;
      case 'ciąża':
        kFactor = 2.0;
        break;
      case 'wzrost':
        kFactor = 2.5;
        break;
      case 'laktacja1':
        kFactor = 2.0;
        break;
      case 'laktacja2':
        kFactor = 2.5;
        break;
      case 'laktacja3-4':
        kFactor = 3.0;
        break;
      case 'laktacja5-6':
        kFactor = 5.0;
        break;
    }
    return rer * kFactor;
  }
}
