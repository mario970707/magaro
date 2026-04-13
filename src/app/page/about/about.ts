import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [TranslateModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}