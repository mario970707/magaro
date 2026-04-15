import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
declare const jQuery: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule]
})
export class Navbar implements AfterViewInit {
  currentLang = 'en';

  constructor(private router: Router, private translate: TranslateService) {}

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang).subscribe(() => {
      console.log('Language changed to:', this.translate.currentLang);
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
    setTimeout(() => {
      const $ = jQuery;
      const $menu = $('#navbar_menu');
      if (!$menu.length) return;
      if ($menu.data('menumaker-initialized')) return;
      $menu.data('menumaker-initialized', true);
      $menu.find('#menu-button').remove();
      $menu.find('.submenu-button').remove();
      $menu.menumaker({
        title: 'Menu',
        format: 'multitoggle'
      });
    }, 0);

    // Cierra el menú cuando cambia la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const $ = jQuery;
        const $btn = $('#menu-button');
        if ($btn.hasClass('menu-opened')) {
          $btn.trigger('click');
        }
      }
    });
  }
}