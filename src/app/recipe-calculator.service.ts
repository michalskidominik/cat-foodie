import { Injectable } from '@angular/core';
import { CatDataService } from './cat-data.service';
import { CatStatus } from './shared';

interface Ingredient {
  name: string;
  weight: number;
  amount: number;
  unit: string; // np. g, ml, szt., miarka
}

interface Supplement extends Ingredient {
  optional?: boolean; // Informacja czy suplement jest opcjonalny (np. w przypadku alergii)
}

interface Recipe {
  id: string; // Unikalne ID przepisu
  name: string; // Nazwa przepisu
  description: string; // Krótki opis przepisu
  ingredients: Ingredient[]; // Lista składników głównych
  supplements: Supplement[]; // Lista suplementów
  energyRaw: number; // Kaloryczność w wersji surowej (kcal)
  energyCooked: number; // Kaloryczność w wersji gotowanej (kcal)
}

export interface ScaledRecipe {
  id: string; // Unikalne ID przepisu
  name: string; // Nazwa przepisu
  description: string; // Krótki opis przepisu
  days: number; // Ilość dni, na które przeliczono przepis
  ingredients: Ingredient[]; // Lista składników głównych
  supplements: Supplement[]; // Lista suplementów
  energy: number; // Kaloryczność przepisu (kcal)
  totalFoodWeight: number; // Całkowita waga jedzenia na podstawie zapotrzebowania
  dailyFoodWeight: number; // Waga jedzenia na dzień
}

export const delicateTurkeyRecipe: Recipe = {
  id: '1',
  name: 'Delikatny indyk dla kocich smakoszy',
  description:
    'Przepis dobry na start dla kotów, które lubią drób, a także dla kotów z wrażliwym układem pokarmowym.',
  ingredients: [
    { name: 'Mięso z piersi indyka', weight: 250, amount: 250, unit: 'g' },
    { name: 'Mięso z udźca indyka', weight: 250, amount: 250, unit: 'g' },
    { name: 'Serca indycze', weight: 100, amount: 100, unit: 'g' },
    { name: 'Żołądki indycze', weight: 50, amount: 50, unit: 'g' },
    { name: 'Żółtko jaja kurzego', weight: 20, amount: 1, unit: 'szt.' },
    { name: 'Wątroba indycza', weight: 40, amount: 40, unit: 'g' },
    { name: 'Woda', weight: 0, amount: 150, unit: 'ml' },
  ],
  supplements: [
    { name: 'Tran z wątroby dorsza', weight: 1, amount: 1, unit: 'g' },
    { name: 'Suplement kelp', weight: 0, amount: 0.5, unit: 'g' },
    { name: 'Drożdże browarnicze', weight: 3, amount: 3, unit: 'g' },
    {
      name: 'Krew wołowa suszona',
      weight: 5,
      amount: 5,
      unit: 'g',
      optional: true,
    },
    { name: 'Witamina E', weight: 1, amount: 1, unit: 'miarka' },
    { name: 'Mączka ze skorupek jaj kurzych', weight: 5, amount: 5, unit: 'g' },
    { name: 'Sól himalajska', weight: 4, amount: 4, unit: 'g' },
    { name: 'Tauryna', weight: 1, amount: 1, unit: 'g' },
  ],
  energyRaw: 108, // TODO: pobierać ilość energii na podstawie składników i suplementów
  energyCooked: 130,
};

@Injectable({
  providedIn: 'root',
})
export class RecipeCalculatorService {
  constructor(private catDataService: CatDataService) {}

  calculateTotalRecipeIngredientWeight(recipe: Recipe): number {
    const ingredientsWeight = recipe.ingredients.reduce(
      (total, ingredient) => total + ingredient.weight,
      0
    );

    const supplementsWeight = recipe.supplements.reduce(
      (total, supplement) => total + supplement.weight,
      0
    );

    return ingredientsWeight + supplementsWeight;
  }

  calculateRecipeForDays(
    recipe: Recipe,
    weight: number,
    days: number,
    catStatus: CatStatus
  ): ScaledRecipe {
    const dailyDER = this.catDataService.calculateDER(weight, catStatus);
    const foodAmountPerDay = (dailyDER / 108) * 100;
    const totalRecipeWeight =
      this.calculateTotalRecipeIngredientWeight(recipe);
    const totalFoodAmount = foodAmountPerDay * days;

    const scaledIngredients: Ingredient[] = [];
    recipe.ingredients.forEach((ingredient) => {
      const scaledWeight = Number(((ingredient.amount / totalRecipeWeight) * totalFoodAmount).toFixed(4));

      scaledIngredients.push({
        name: ingredient.name,
        weight: scaledWeight,
        amount: ingredient.unit === 'g' ? scaledWeight : ingredient.amount,
        unit: ingredient.unit,
      })
    });

    const scaledSupplements: Supplement[] = [];
    recipe.supplements.forEach((supplement) => {
      const scaledWeight = Number(((supplement.amount / totalRecipeWeight) * totalFoodAmount).toFixed(4));

      scaledSupplements.push({
        name: supplement.name,
        weight: scaledWeight,
        amount: supplement.unit === 'g' ? scaledWeight : supplement.amount,
        unit: supplement.unit,
      })
    });

    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      days: days,
      energy: recipe.energyRaw, // TODO: zakładamy brak gotowania
      ingredients: scaledIngredients,
      supplements: scaledSupplements,
      totalFoodWeight: totalFoodAmount,
      dailyFoodWeight: totalFoodAmount / days,
    };
  }
}
