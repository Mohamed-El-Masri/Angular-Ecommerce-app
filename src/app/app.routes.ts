import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/add', loadComponent: () => import('./components/add-product/add-product.component').then(m => m.AddProductComponent) },
  { path: 'products/edit/:id', loadComponent: () => import('./components/edit-product/edit-product.component').then(m => m.EditProductComponent) },
  { path: 'products/:id', loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: '**', loadComponent: () => import('./components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
];
