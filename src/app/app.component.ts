import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CatDataService } from './cat-data.service';
import {
  delicateTurkeyRecipe,
  RecipeCalculatorService,
  ScaledRecipe,
} from './recipe-calculator.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatChipsModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  #catDataService = inject(CatDataService);
  #recipeCalculatorService = inject(RecipeCalculatorService);
  selectedPets: string[] = ['Kiara'];
  selectedPeriod: number = 7;
  selectedWeight: number = 5.9;

  generatedRecipe = signal<ScaledRecipe | undefined>(undefined);

  generateRecipes(): void {
    if (this.selectedPets.includes('Kiara')) {
      const recipe = this.#recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        this.selectedWeight,
        this.selectedPeriod,
        'kastrowany'
      );
      this.generatedRecipe.set(recipe);
      // this.#catDataService.calculateDER(this.selectedWeight, 'kastrowany'),
    } else if (this.selectedPets.includes('Lucyfer')) {
      // this.data = {
      //   cat: 'Lucyfer',
      //   der: this.#catDataService.calculateDER(
      //     this.selectedWeight,
      //     'kastrowany'
      //   ),
      // };
    }
  }
}
