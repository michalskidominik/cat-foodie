import { TestBed } from '@angular/core/testing';
import { CatDataService } from './cat-data.service';
import {
  delicateTurkeyRecipe,
  RecipeCalculatorService,
} from './recipe-calculator.service';

describe('RecipeCalculatorService', () => {
  let recipeCalculatorService: RecipeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatDataService, RecipeCalculatorService],
    });
    recipeCalculatorService = TestBed.inject(RecipeCalculatorService);
  });

  it('should be created', () => {
    expect(recipeCalculatorService).toBeTruthy();
  });

  describe('Recipe scaling tests', () => {
    it('should correctly calculate recipe for a 5 kg neutered cat for 1 day', () => {
      const weight = 5;
      const days = 1;
      const status = 'kastrowany';
      const expectedDailyFoodAmount = 228.6469; // oczekiwany wynik z instrukcji weterynaryjnej

      const result = recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        weight,
        days,
        status
      );

      expect(result.totalFoodWeight).toBeCloseTo(expectedDailyFoodAmount, 0); // Porównanie wyniku z dokładnością do całkowitej liczby gramów
    });

    it('should correctly scale the recipe for a 5 kg neutered cat for 3 days', () => {
      const weight = 5;
      const days = 3;
      const status = 'kastrowany';
      const expectedTotalFoodAmount = 228.6469 * days; // oczekiwane zapotrzebowanie na 3 dni

      const result = recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        weight,
        days,
        status
      );

      // Sprawdzamy, czy różnica między oczekiwanym a rzeczywistym wynikiem jest mniejsza lub równa 5 gramów
      const difference = Math.abs(
        result.totalFoodWeight - expectedTotalFoodAmount
      );
      expect(difference).toBeLessThanOrEqual(5);
    });

    it('should correctly scale individual ingredients for a 5 kg neutered cat for 1 day', () => {
      const weight = 5;
      const days = 1;
      const status = 'kastrowany';
      const totalRecipeIngredientWeight =
        recipeCalculatorService.calculateTotalRecipeIngredientWeight(
          delicateTurkeyRecipe
        );

      const result = recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        weight,
        days,
        status
      );

      // Przykładowe weryfikacje wybranych składników
      expect(
        result.ingredients.find((i) => i.name === 'Mięso z piersi indyka')!
          .weight
      ).toBeCloseTo((250 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości piersi indyka
      expect(
        result.ingredients.find((i) => i.name === 'Mięso z udźca indyka')!
          .weight
      ).toBeCloseTo((250 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości udźca indyka
      expect(
        result.ingredients.find((i) => i.name === 'Serca indycze')!.weight
      ).toBeCloseTo((100 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości serc indyczych
    });

    it('should correctly scale individual ingredients for a 5 kg neutered cat for 3 days', () => {
      const weight = 5;
      const days = 3;
      const status = 'kastrowany';
      const totalRecipeIngredientWeight =
        recipeCalculatorService.calculateTotalRecipeIngredientWeight(
          delicateTurkeyRecipe
        );

      const result = recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        weight,
        days,
        status
      );

      // Przykładowe weryfikacje wybranych składników dla 3 dni
      expect(
        result.ingredients.find((i) => i.name === 'Mięso z piersi indyka')!
          .weight
      ).toBeCloseTo((250 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości piersi indyka
      expect(
        result.ingredients.find((i) => i.name === 'Mięso z udźca indyka')!
          .weight
      ).toBeCloseTo((250 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości udźca indyka
      expect(
        result.ingredients.find((i) => i.name === 'Serca indycze')!.weight
      ).toBeCloseTo((100 / totalRecipeIngredientWeight) * 228.6469 * days, 2); // porównanie ilości serc indyczych
    });

    it('should correctly calculate weight per day for a 5 kg neutered cat for 3 days', () => {
      const weight = 5;
      const days = 3;
      const status = 'kastrowany';
      const expectedDailyFoodAmount = 228.6469; // oczekiwany wynik z instrukcji weterynaryjnej

      const result = recipeCalculatorService.calculateRecipeForDays(
        delicateTurkeyRecipe,
        weight,
        days,
        status
      );

      expect(result.dailyFoodWeight).toBeCloseTo(expectedDailyFoodAmount, 0); // Porównanie wyniku z dokładnością do całkowitej liczby gramów
    });
  });

  describe('calculateTotalRecipeIngredientWeight', () => {
    it('should correctly calculate the total weight of ingredients for delicateTurkeyRecipe', () => {
      const totalWeight =
        recipeCalculatorService.calculateTotalRecipeIngredientWeight(
          delicateTurkeyRecipe
        );
      expect(totalWeight).toBe(730); // Sum of weights of all ingredients in delicateTurkeyRecipe
    });

    it('should return 0 for a recipe with no ingredients', () => {
      const emptyRecipe = {
        ...delicateTurkeyRecipe,
        ingredients: [],
        supplements: [],
      };
      const totalWeight =
        recipeCalculatorService.calculateTotalRecipeIngredientWeight(
          emptyRecipe
        );
      expect(totalWeight).toBe(0);
    });

    it('should correctly calculate the total weight for a recipe with one ingredient', () => {
      const singleIngredientRecipe = {
        ...delicateTurkeyRecipe,
        ingredients: [
          { name: 'Test Ingredient', weight: 100, amount: 100, unit: 'g' },
        ],
        supplements: [
          { name: 'Test Supplement', weight: 5, amount: 5, unit: 'g' },
        ],
      };
      const totalWeight =
        recipeCalculatorService.calculateTotalRecipeIngredientWeight(
          singleIngredientRecipe
        );
      expect(totalWeight).toBe(105);
    });
  });
});
