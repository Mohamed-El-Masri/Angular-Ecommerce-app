import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService) {
    this.loading$ = this.productService.loading$;
    this.error$ = this.productService.error$;
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.productService.searchProducts(query))
    ).subscribe(products => {
      this.filteredProducts = products;
    });

    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.searchSubject.next('');
  }

  searchProducts(): void {
    this.searchSubject.next(this.searchQuery);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
  }
  
  reloadProducts(): void {
    this.productService.loadProducts();
  }
}
