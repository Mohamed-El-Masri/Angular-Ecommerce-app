import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../services/product.service';
import { HighlightSearchPipe } from '../../pipes/highlight-search.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HighlightSearchPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() searchTerm: string = '';
  @Output() delete = new EventEmitter<number>();
  
  getButtonClass(): string {
    if (this.product.quantity === 0) {
      return 'btn-danger';
    } else if (this.product.quantity === 1) {
      return 'btn-warning';
    } else {
      return 'btn-success';
    }
  }
  
  getButtonText(): string {
    if (this.product.quantity === 0) {
      return 'Out of Stock';
    } else {
      return 'Buy Now';
    }
  }
  
  onDelete(): void {
    this.delete.emit(this.product.id);
  }
}
