import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() componentChange = new EventEmitter<string>();
  activeNavItem = 'hero'; // Default active navigation item

  navigateTo(component: string) {
    this.activeNavItem = component;
    this.componentChange.emit(component);
  }
}
