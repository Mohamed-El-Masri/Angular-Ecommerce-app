import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<any>();
  
  newProduct = {
    name: '',
    price: 0,
    quantity: 0,
    imageUrl: 'https://via.placeholder.com/150?text=New+Product'
  };
  
  uploadSuccess = false;
  uploadMessage = '';
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      // For simplicity in the basic version, we'll just use the placeholder image
      // In a real app, you would use FileReader to read the image
      this.uploadSuccess = true;
      this.uploadMessage = 'Image uploaded successfully';
      
      // For demonstration, we'll just change the placeholder text
      this.newProduct.imageUrl = `https://via.placeholder.com/150?text=${encodeURIComponent(file.name)}`;
    }
  }
  
  addProduct(): void {
    if (this.validateProduct()) {
      // Create a copy of the newProduct to emit
      const productToAdd = {
        name: this.newProduct.name,
        price: Number(this.newProduct.price),
        quantity: Number(this.newProduct.quantity),
        imageUrl: this.newProduct.imageUrl
      };
      
      this.productAdded.emit(productToAdd);
      
      // Reset the form
      this.newProduct = {
        name: '',
        price: 0,
        quantity: 0,
        imageUrl: 'https://via.placeholder.com/150?text=New+Product'
      };
      
      this.uploadSuccess = false;
    }
  }
  
  validateProduct(): boolean {
    // Basic validation
    if (!this.newProduct.name) {
      alert('Please enter a product name');
      return false;
    }
    
    if (this.newProduct.price <= 0) {
      alert('Price must be greater than zero');
      return false;
    }
    
    if (this.newProduct.quantity < 0 || !Number.isInteger(this.newProduct.quantity)) {
      alert('Quantity must be a non-negative integer');
      return false;
    }
    
    return true;
  }
}
