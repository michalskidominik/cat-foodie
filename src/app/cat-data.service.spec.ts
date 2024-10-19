import { TestBed } from '@angular/core/testing';

import { CatDataService, CatStatus } from './cat-data.service';

describe('CatDataService', () => {
  let service: CatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Obliczenia RER i DER', () => {
    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 3 kg', () => {
      const weight = 3;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 176; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });

    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 4 kg', () => {
      const weight = 4;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 213; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });

    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 5 kg', () => {
      const weight = 5;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 248; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });

    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 5.9 kg', () => {
      const weight = 5.9;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 276; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });

    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 6 kg', () => {
      const weight = 6;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 280; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });

    it('powinno poprawnie obliczyć DER dla kota kastrowanego o wadze 7 kg', () => {
      const weight = 7;
      const status: CatStatus = 'kastrowany';
      const expectedDER = 310; // wartość z tabeli
      const calculatedDER = service.calculateDER(weight, status);
      expect(calculatedDER).toBe(expectedDER);
    });
  });
});
