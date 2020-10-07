import { Component } from '@angular/core';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'um-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'UserManagement';
}
