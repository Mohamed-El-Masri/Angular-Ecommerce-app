import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle" (click)="toggleTheme()" title="Toggle dark/light theme">
      <i class="fa" [ngClass]="{'fa-moon-o': !isDarkMode, 'fa-sun-o': isDarkMode}"></i>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: transparent;
      border: none;
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .theme-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .theme-toggle i {
      font-size: 1.2rem;
    }
  `]
})
export class ThemeToggleComponent {
  isDarkMode = false;
  
  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
