import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CatStatus } from '../../../../shared';
import { Cat } from '../../services/cat';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-cat-form-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './cat-form-page.component.html',
  styleUrl: './cat-form-page.component.scss',
})
export class CatFormPageComponent implements OnInit {

  #formBuilder = inject(FormBuilder);
  #catService = inject(CatService);
  id = input<string | null>(null);
  catStatusOptions: { value: CatStatus; viewValue: string }[] = [
    { value: 'niekastrowany', viewValue: 'Niekastrowany' },
    { value: 'kastrowany', viewValue: 'Kastrowany' },
    { value: 'otyły', viewValue: 'Otyły' },
    { value: 'odchudzanie', viewValue: 'Odchudzanie' },
    { value: 'intensywna terapia', viewValue: 'Intensywna Terapia' },
    { value: 'rekonwalescencja', viewValue: 'Rekonwalescencja' },
    { value: 'ruja', viewValue: 'Ruja' },
    { value: 'ciąża', viewValue: 'Ciąża' },
    { value: 'wzrost', viewValue: 'Wzrost' },
    { value: 'laktacja1', viewValue: 'Laktacja 1 młodego' },
    { value: 'laktacja2', viewValue: 'Laktacja 2 młodych' },
    { value: 'laktacja3-4', viewValue: 'Laktacja 3-4 młodych' },
    { value: 'laktacja5-6', viewValue: 'Laktacja 5-6 młodych' },
  ];

  protected cats = signal<Cat[]>([]);

  protected form = this.#formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    breed: [''], // TODO: zmienić na select
    birthDate: [null, Validators.required],
    weight: [0, [Validators.min(0), Validators.required]],
    weightDateUpdated: [null],
    status: [null, Validators.required],
  });

  ngOnInit(): void {
    this.loadCatsList();
  }

  save(): void {
    const catId = this.id();

    // TODO: strongly typed validation
    if (catId) {
      this.#catService.edit(catId, this.form.getRawValue() as any);
    } else {
      this.#catService.create(this.form.getRawValue() as any);
    }

    this.loadCatsList();
  }

  private loadCatsList() {
    this.#catService.getAll().then((cats) => this.cats.set(cats));
  }
}
