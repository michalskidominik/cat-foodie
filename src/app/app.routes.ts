import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cats',
    loadChildren: () => import('./features/cats').then((m) => m.CATS_ROUTES),
  },
];
