import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private _isLoaded = new BehaviorSubject<boolean>(false);
  
  public isLoaded$: Observable<boolean> = this._isLoaded.asObservable();
  
  constructor() {
    // Simulate page load completion after resources are loaded
    window.addEventListener('load', () => {
      setTimeout(() => this._isLoaded.next(true), 300);
    });
    
    // If window already loaded, set loaded state
    if (document.readyState === 'complete') {
      setTimeout(() => this._isLoaded.next(true), 300);
    }
  }
  
  /**
   * Utility method to apply CSS animation to an element
   * @param element The DOM element to animate
   * @param animationName Name of the animation (defined in global styles)
   * @param options Animation options like duration, delay
   */
  public animateElement(
    element: HTMLElement,
    animationName: string,
    options: AnimationOptions = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const { duration = 300, delay = 0, easing = 'ease' } = options;
      
      element.style.animation = `${animationName} ${duration}ms ${easing} ${delay}ms both`;
      
      const handleAnimationEnd = () => {
        element.style.animation = '';
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    });
  }
  
  /**
   * Create a staggered animation for a group of elements
   * @param elements Array of elements to animate
   * @param animationName Name of the animation
   * @param options Animation options
   * @param staggerDelay Delay between each element animation
   */
  public animateStaggered(
    elements: HTMLElement[],
    animationName: string,
    options: AnimationOptions = {},
    staggerDelay: number = 100
  ): Promise<void> {
    const promises = elements.map((element, index) => {
      const elementOptions = {
        ...options,
        delay: (options.delay || 0) + (index * staggerDelay)
      };
      
      return this.animateElement(element, animationName, elementOptions);
    });
    
    return Promise.all(promises).then(() => {});
  }
}
