import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Output() deleteProduct = new EventEmitter<number>();
  
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: string = 'default';
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.applyFilters();
    }
  }
  
  applyFilters(): void {
    // First filter by search term
    let result = this.products.filter(product => {
      if (this.searchTerm === '') {
        return true;
      }
      return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    
    // Then sort by the selected option
    switch(this.sortBy) {
      case 'name':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'quantity':
        result = result.sort((a, b) => b.quantity - a.quantity);
        break;
    }
    
    this.filteredProducts = result;
  }
  
  onSearch(): void {
    this.applyFilters();
  }
  
  onSortChange(): void {
    this.applyFilters();
  }
  
  onDeleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct.emit(productId);
    }
  }
  
  // Helper methods to avoid template errors
  getOutOfStockCount(): number {
    return this.products ? this.products.filter(product => product.quantity === 0).length : 0;
  }
  
  getTotalStock(): number {
    return this.products ? this.products.reduce((sum, product) => sum + product.quantity, 0) : 0;
  }
}
