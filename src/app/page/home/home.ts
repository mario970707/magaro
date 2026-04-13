import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';  // ← AGREGA ESTO

@Component({
  selector: 'app-home',
  imports: [TranslateModule, RouterLink],  // ← AGREGA RouterLink AQUÍ
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}