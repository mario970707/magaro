import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-smart-home',
  imports: [TranslateModule, RouterLink],
  templateUrl: './smart-home.html',
  styleUrl: './smart-home.scss',
})
export class SmartHome {
  changes = [1, 2, 3, 4];
  faqs = [1, 2, 3, 4, 5, 6, 7];
}
