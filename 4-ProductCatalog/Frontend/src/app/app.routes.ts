import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'category-new', component: CategoryFormComponent },
  { path: 'product-new', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];
