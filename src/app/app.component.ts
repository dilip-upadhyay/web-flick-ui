import { Component } from '@angular/core';
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DashboardComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'web-flick-ui';
}
