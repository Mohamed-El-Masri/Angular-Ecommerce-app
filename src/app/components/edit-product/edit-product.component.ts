import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  productId: number = 0;
  productNotFound = false;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', Validators.required],
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct(this.productId);
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.setValue({
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
            category: product.category,
            inStock: product.inStock
          });
        } else {
          this.productNotFound = true;
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.productNotFound = true;
      }
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const updatedProduct: Product = {
      id: this.productId,
      name: this.f['name'].value,
      price: this.f['price'].value,
      description: this.f['description'].value,
      imageUrl: this.f['imageUrl'].value,
      category: this.f['category'].value,
      inStock: this.f['inStock'].value
    };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
