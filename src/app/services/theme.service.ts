import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _theme = new BehaviorSubject<Theme>(this.getStoredTheme());
  private isBrowser: boolean;
  
  theme$ = this._theme.asObservable();

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.applyTheme(this._theme.value);
  }

  private getStoredTheme(): Theme {
    if (this.isBrowser) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme as Theme;
      }
      
      // Use system preference as default in browser
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Default to 'light' theme when not in browser or no preferences found
    return 'light';
  }

  setTheme(theme: Theme): void {
    this._theme.next(theme);
    
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
    }
    
    this.applyTheme(theme);
  }
  
  toggleTheme(): void {
    const newTheme = this._theme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  private applyTheme(theme: Theme): void {
    if (this.isBrowser) {
      const html = document.documentElement;
      
      if (theme === 'dark') {
        this.renderer.addClass(html, 'dark-theme');
      } else {
        this.renderer.removeClass(html, 'dark-theme');
      }
    }
  }
}
