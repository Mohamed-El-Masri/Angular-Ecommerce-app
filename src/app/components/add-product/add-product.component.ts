import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup;
  submitted = false;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['https://via.placeholder.com/200x300', Validators.required],
      category: ['', Validators.required],
      inStock: [true]
    });
    
    this.productService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
    
    this.productService.error$.subscribe(errorMsg => {
      this.error = errorMsg;
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const product: Omit<Product, 'id'> = {
      name: this.f['name'].value,
      price: this.f['price'].value,
      description: this.f['description'].value,
      imageUrl: this.f['imageUrl'].value,
      category: this.f['category'].value,
      inStock: this.f['inStock'].value
    };

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
