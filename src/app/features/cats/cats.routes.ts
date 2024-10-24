import { Routes } from '@angular/router';
import { CatFormPageComponent } from './containers/cat-form-page/cat-form-page.component';
import { CatListPageComponent } from './containers/cat-list-page/cat-list-page.component';

export const CATS_ROUTES: Routes = [
  {
    path: '',
    component: CatListPageComponent,
  },
  {
    path: 'add',
    component: CatFormPageComponent,
  },
  {
    path: 'edit/:id',
    component: CatFormPageComponent,
  },
];
