import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="isVisible" class="scroll-to-top" (click)="scrollToTop()">
      <i class="fa fa-arrow-up"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--primary), var(--primary-dark));
      color: white;
      border: none;
      box-shadow: var(--shadow);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      opacity: 0.8;
      z-index: 100;
      animation: fadeIn 0.3s ease-out;
    }
    
    .scroll-to-top:hover {
      opacity: 1;
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 0.8; transform: translateY(0); }
    }
  `]
})
export class ScrollToTopComponent {
  isVisible = false;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
