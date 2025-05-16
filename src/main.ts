import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Bootstrap the application with the root component
bootstrapApplication(AppComponent, {
  providers: [] // We're not using any providers like HTTP or Routing
})
  .catch(err => console.error(err));
