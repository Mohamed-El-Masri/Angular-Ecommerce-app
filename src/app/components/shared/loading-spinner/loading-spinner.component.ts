import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'full-page': fullPage}">
      <div class="spinner-content">
        <div class="spinner-border" [ngClass]="{'spinner-lg': size === 'large'}" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p *ngIf="message" class="spinner-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      text-align: center;
    }
    
    .full-page {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
      padding: 0;
    }
    
    .spinner-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .spinner-border {
      color: var(--primary);
      width: 2rem;
      height: 2rem;
    }
    
    .spinner-lg {
      width: 3rem;
      height: 3rem;
    }
    
    .spinner-message {
      margin-top: 1rem;
      font-weight: 500;
      color: var(--gray-700);
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Loading...';
  @Input() fullPage: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
