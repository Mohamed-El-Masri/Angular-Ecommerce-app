import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, 
    HeroComponent, 
    PortfolioComponent, 
    AboutComponent, 
    FooterComponent, 
    ContactComponent,
    AddProductComponent,
    ProductListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MasryApp';
  activeComponent = 'hero'; // Default component to show
  products = [
    { 
      id: 1, 
      name: 'Laptop', 
      price: 999.99, 
      quantity: 5, 
      imageUrl: 'https://via.placeholder.com/150?text=Laptop'
    },
    { 
      id: 2, 
      name: 'Smartphone', 
      price: 599.99, 
      quantity: 1, 
      imageUrl: 'https://via.placeholder.com/150?text=Smartphone'
    },
    { 
      id: 3, 
      name: 'Headphones', 
      price: 129.99, 
      quantity: 0, 
      imageUrl: 'https://via.placeholder.com/150?text=Headphones'
    }
  ];

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
  
  addProduct(newProduct: any) {
    // Create a new ID by finding the max ID and adding 1
    const newId = Math.max(...this.products.map(p => p.id)) + 1;
    
    // Add the new product with the generated ID
    this.products = [
      ...this.products,
      {
        ...newProduct,
        id: newId
      }
    ];
  }
  
  deleteProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
  }
}
