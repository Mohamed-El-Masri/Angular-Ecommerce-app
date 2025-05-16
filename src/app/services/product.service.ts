import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private apiUrl = '/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    this.http.get<Product[]>(this.apiUrl)
      .pipe(
        tap(products => {
          this.productsSubject.next(products);
          this.loadingSubject.next(false);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    this.loadingSubject.next(true);
    
    return this.http.post<Product>(this.apiUrl, product)
      .pipe(
        tap(newProduct => {
          const currentProducts = this.productsSubject.value;
          this.productsSubject.next([...currentProducts, newProduct]);
          this.loadingSubject.next(false);
        }),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    this.loadingSubject.next(true);
    
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product)
      .pipe(
        tap(updatedProduct => {
          const currentProducts = this.productsSubject.value;
          const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            const updatedProducts = [
              ...currentProducts.slice(0, index),
              updatedProduct,
              ...currentProducts.slice(index + 1)
            ];
            this.productsSubject.next(updatedProducts);
          }
          this.loadingSubject.next(false);
        }),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<void> {
    this.loadingSubject.next(true);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentProducts = this.productsSubject.value;
          const updatedProducts = currentProducts.filter(product => product.id !== id);
          this.productsSubject.next(updatedProducts);
          this.loadingSubject.next(false);
        }),
        catchError(this.handleError)
      );
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return this.getProducts();
    }
    
    return this.getProducts().pipe(
      map(products => {
        query = query.toLowerCase();
        return products.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      })
    );
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    this.loadingSubject.next(false);
    this.errorSubject.next(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
