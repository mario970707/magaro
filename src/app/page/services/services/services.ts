import { Component ,AfterViewInit,ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [TranslateModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',

  encapsulation: ViewEncapsulation.None
})

export class Services implements AfterViewInit {

  ngAfterViewInit(): void {
    document.querySelectorAll('.mg-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mg-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.mg-panel').forEach((p: any) => p.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        const panel = document.getElementById('tab-' + tab);
        if (panel) panel.classList.add('active');
      });
    });
  }
}
