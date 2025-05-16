import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="alert" [ngClass]="'alert-' + type" role="alert">
      <div class="alert-content">
        <i [ngClass]="getIconClass()"></i>
        <div class="alert-message">
          <h4 *ngIf="title" class="alert-title">{{ title }}</h4>
          <p class="alert-text">{{ message }}</p>
        </div>
      </div>
      <button *ngIf="dismissible" type="button" class="alert-close" (click)="onClose()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `,
  styles: [`
    .alert {
      padding: 1rem 1.5rem;
      margin-bottom: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-sm);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      animation: fadeIn 0.3s ease-out;
      border: none;
    }
    
    .alert-content {
      display: flex;
      align-items: center;
    }
    
    .alert i {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    
    .alert-success {
      background-color: #e6f7ed;
      color: var(--success);
    }
    
    .alert-danger {
      background-color: #fdeded;
      color: var(--danger);
    }
    
    .alert-warning {
      background-color: #fff8e6;
      color: var(--warning);
    }
    
    .alert-info {
      background-color: #e6f1ff;
      color: var(--primary);
    }
    
    .alert-title {
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }
    
    .alert-text {
      margin: 0;
      font-size: 0.95rem;
    }
    
    .alert-close {
      background: transparent;
      border: none;
      padding: 0.25rem 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      opacity: 0.5;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .alert-close:hover {
      opacity: 1;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AlertComponent {
  @Input() title?: string;
  @Input() message: string = '';
  @Input() type: AlertType = 'info';
  @Input() dismissible: boolean = true;
  @Input() visible: boolean = true;
  
  @Output() close = new EventEmitter<void>();
  
  getIconClass(): string {
    const iconMap: Record<AlertType, string> = {
      success: 'fa fa-check-circle',
      danger: 'fa fa-exclamation-circle',
      warning: 'fa fa-warning',
      info: 'fa fa-info-circle'
    };
    
    return iconMap[this.type] || iconMap.info;
  }
  
  onClose(): void {
    this.visible = false;
    this.close.emit();
  }
}
