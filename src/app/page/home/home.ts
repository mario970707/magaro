import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';  // ← AGREGA ESTO

@Component({
  selector: 'app-home',
  imports: [TranslateModule, RouterLink],  // ← AGREGA RouterLink AQUÍ
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stage') stage?: ElementRef<HTMLElement>;

  // Fotos y textos del carrusel. Para cambiar una foto, cambia solo "img".
  slides = [
    { img: 'assets/images/smart-home/hero-1.jpg', key: 'home.hero1', blue: false },
    { img: 'assets/images/smart-home/hero-2.jpg', key: 'home.hero2', blue: false },
    { img: 'assets/images/smart-home/hero-3-temporal.jpg', key: 'home.hero3', blue: true },
    { img: 'assets/images/smart-home/hero-4.jpg', key: 'home.hero4', blue: false },
  ];
  active = signal(0);

  benefits = [
    { key: 'ben1', icon: 'fa-home' },
    { key: 'ben2', icon: 'fa-clock-o' },
    { key: 'ben3', icon: 'fa-bolt' },
    { key: 'ben4', icon: 'fa-eye' },
    { key: 'ben5', icon: 'fa-microphone' },
    { key: 'ben6', icon: 'fa-plus-circle' },
  ];

  // Carrusel de productos. Para cambiar una foto, cambia solo "img".
  products = [
    { key: 'prod1', img: 'assets/images/smart-home/p-voz-temporal.jpg' },
    { key: 'prod2', img: 'assets/images/smart-home/p-cerradura-temporal.jpg' },
    { key: 'prod3', img: 'assets/images/smart-home/p-luces.jpg' },
    { key: 'prod4', img: 'assets/images/smart-home/p-termostato-temporal.jpg' },
    { key: 'prod5', img: 'assets/images/smart-home/p-cortinas.jpg' },
    { key: 'prod6', img: 'assets/images/smart-home/p-camara-temporal.jpg' },
    { key: 'prod7', img: 'assets/images/smart-home/p-sensores-temporal.jpg' },
    { key: 'prod8', img: 'assets/images/smart-home/p-panel-temporal.jpg' },
  ];
  prodActive = signal(0);

  // Escena: lo que muestra el panel en cada momento del día
  sceneSteps = [
    { key: 'scene1', time: '6:30 PM', locked: false, lights: 60, curtains: 100, temp: 74, music: false, bright: 0.55 },
    { key: 'scene2', time: '7:30 PM', locked: true, lights: 45, curtains: 60, temp: 74, music: true, bright: 0.42 },
    { key: 'scene3', time: '9:00 PM', locked: true, lights: 10, curtains: 0, temp: 73, music: false, bright: 0.2 },
    { key: 'scene4', time: '11:00 PM', locked: true, lights: 0, curtains: 0, temp: 76, music: false, bright: 0.08 },
    { key: 'scene5', time: '6:45 AM', locked: true, lights: 30, curtains: 100, temp: 74, music: true, bright: 0.75 },
  ];
  sceneStep = signal(0);
  @ViewChild('scene') scene?: ElementRef<HTMLElement>;

  guides = [
    { key: 'blog1', img: 'assets/images/smart-home/guia-wifi.jpg' },
    { key: 'blog2', img: 'assets/images/smart-home/guia-camaras.jpg' },
    { key: 'blog3', img: 'assets/images/smart-home/guia-smart-home.jpg' },
  ];

  homePlans = [
    { key: 'apt', top: false },
    { key: 'house', top: true },
    { key: 'super', top: false },
  ];

  private timer?: ReturnType<typeof setInterval>;

  private onScroll = () => {
    const el = this.scene?.nativeElement;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const total = box.height - window.innerHeight;
    const progress = Math.min(Math.max(-box.top / total, 0), 0.999);
    this.sceneStep.set(Math.floor(progress * this.sceneSteps.length));
  };

  ngOnInit(): void {
    this.resume();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    this.pause();
    window.removeEventListener('scroll', this.onScroll);
    this.headerObserver?.disconnect();
  }

  // Mide el menú real para que la portada siempre quepa completa en la pantalla
  private headerObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    const header = document.querySelector('#default_header .header_bottom');
    const stage = this.stage?.nativeElement;
    if (!header || !stage) return;
    this.headerObserver = new ResizeObserver(() => {
      // La altura real del menú es donde empieza la sección de la portada
      const top = stage.parentElement!.getBoundingClientRect().top + window.scrollY;
      stage.style.setProperty('--sh-head', top + 'px');
    });
    this.headerObserver.observe(header);
  }

  goProduct(index: number): void {
    this.prodActive.set((index + this.products.length) % this.products.length);
  }

  // Posición de cada tarjeta respecto a la activa: 0 = activa, 1.. = en fila
  prodPos(i: number): number {
    return (i - this.prodActive() + this.products.length) % this.products.length;
  }

  prodState(i: number): string {
    const pos = this.prodPos(i);
    if (pos === 0) return 'active';
    if (pos === this.products.length - 1) return 'prev';
    return pos <= 4 ? 'card' : 'hidden';
  }

  go(index: number): void {
    this.active.set((index + this.slides.length) % this.slides.length);
  }

  pause(): void {
    clearInterval(this.timer);
  }

  resume(): void {
    this.pause();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.timer = setInterval(() => this.go(this.active() + 1), 6500);
  }

  // Movimiento suave de la foto siguiendo el mouse
  onPointerMove(event: PointerEvent): void {
    const el = this.stage?.nativeElement;
    if (!el || event.pointerType !== 'mouse') return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--px', ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
    el.style.setProperty('--py', ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
  }
}
