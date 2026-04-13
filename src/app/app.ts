import { Component, signal ,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { Footer } from "./shared/footer/footer";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import * as AOS from 'aos';

declare global {
  interface Window {
    initTemplate?: () => void;
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar ,TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('magaro');
  
  constructor(private router: Router) {}

    ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 50,
        delay: 0,
  startEvent: 'DOMContentLoaded'
    });
      window.addEventListener('load', () => {
    AOS.refresh();
  });
  }

  async goToContact(): Promise<void> {

    if (this.router.url !== '/') {
      await this.router.navigateByUrl('/');
    }

    setTimeout(() => {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

   ngAfterViewInit(): void {
    setTimeout(() => window.initTemplate?.(), 0);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          window.initTemplate?.();
          AOS.refresh();
        }, 100);
      });
  }
}
