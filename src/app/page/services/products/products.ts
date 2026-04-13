import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CartService, Product } from '../../../shared/cart';

@Component({
  selector: 'app-products',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  cartService = inject(CartService);
  private translate = inject(TranslateService);

  selectedCategory = signal('all');
  showCart = signal(false);
  addedProductId = signal<number | null>(null);


  categories = [
    { id: 'all', label: 'All Products', labelEs: 'Todos' },
    { id: 'cameras', label: '📷 Security Cameras', labelEs: '📷 Cámaras' },
    { id: 'smarthome', label: '🏠 Smart Home', labelEs: '🏠 Hogar Inteligente' },
    { id: 'tvmount', label: '📺 TV Mounts', labelEs: '📺 Soportes TV' },
    { id: 'network', label: '📶 Network & WiFi', labelEs: '📶 Red & WiFi' },
    { id: 'lights', label: '💡 LED & Lights', labelEs: '💡 Luces LED' },
    
  ];

products: Product[] = [
  // Security Cameras
  { id: 1, name: 'Blink Outdoor 4 (2-cam system)', nameEs: 'Blink Outdoor 4 (sistema 2 cámaras)', price: 79.99, image: 'assets/images/products/41hbmiP+77L._SL1000_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 5, badge: 'Best Seller', amazonUrl: 'https://www.amazon.com/dp/B0B1N5HW22' },
  { id: 2, name: 'Arlo Pro 5S 2K Security Camera', nameEs: 'Cámara Arlo Pro 5S 2K', price: 249.99, image: 'https://m.media-amazon.com/images/I/71t0rFPSNUL._AC_SL1500_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 5, badge: 'Top Rated', amazonUrl: 'https://www.amazon.com/dp/B09WZBPX7K' },
  { id: 3, name: 'Ring Stick Up Cam Pro (Battery)', nameEs: 'Ring Stick Up Cam Pro (Batería)', price: 179.99, image: 'https://m.media-amazon.com/images/I/61f6V9JTKGL._AC_SL1500_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B09WZBPX7K' },
  { id: 4, name: 'TP-Link Tapo C420S2 (2-cam kit)', nameEs: 'TP-Link Tapo C420S2 (kit 2 cámaras)', price: 89.99, image: 'https://m.media-amazon.com/images/I/71X0b4A9kJL._AC_SL1500_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B0B6GV4X6J' },
  { id: 5, name: 'Eufy SoloCam S340 Solar 4K', nameEs: 'Eufy SoloCam S340 Solar 4K', price: 149.99, image: 'https://m.media-amazon.com/images/I/71yWwBhTHmL._AC_SL1500_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B0CCX2LMWN' },
  { id: 6, name: 'Ring Floodlight Cam Pro 4K', nameEs: 'Ring Floodlight Cam Pro 4K', price: 249.99, image: 'https://m.media-amazon.com/images/I/71KIbMdmBOL._AC_SL1500_.jpg', category: 'cameras', categoryEs: 'Cámaras', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B09WZBPX7K' },
  // Smart Home
  { id: 7, name: 'Amazon Echo Dot (5th Gen)', nameEs: 'Amazon Echo Dot (5ta Gen)', price: 49.99, image: 'https://m.media-amazon.com/images/I/71xoR4A6x3L._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 5, badge: 'Best Seller', amazonUrl: 'https://www.amazon.com/dp/B09B8V1LZ3' },
  { id: 8, name: 'Google Nest Hub (2nd Gen)', nameEs: 'Google Nest Hub (2da Gen)', price: 99.99, image: 'https://m.media-amazon.com/images/I/61r7tCCIvoL._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B08SRG3ZPD' },
  { id: 9, name: 'Philips Hue Starter Kit (4 bulbs)', nameEs: 'Kit Inicial Philips Hue (4 bombillas)', price: 199.99, image: 'https://m.media-amazon.com/images/I/61tKHmLBZ2L._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B07PVKZQQ8' },
  { id: 10, name: 'Kasa Smart Plug Mini (4-pack)', nameEs: 'Kasa Smart Plug Mini (paquete 4)', price: 29.99, image: 'https://m.media-amazon.com/images/I/61XnSlJZFzL._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 4, badge: 'Best Value', amazonUrl: 'https://www.amazon.com/dp/B091FXLMS8' },
  { id: 11, name: 'Ring Video Doorbell (newest model)', nameEs: 'Timbre Ring Video (último modelo)', price: 99.99, image: 'https://m.media-amazon.com/images/I/61QVpuSVHFL._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B08N5NQ869' },
  { id: 12, name: 'Google Nest Thermostat', nameEs: 'Termostato Google Nest', price: 129.99, image: 'https://m.media-amazon.com/images/I/61DwfXxcnYL._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B08HR892XD' },
  { id: 13, name: 'Tapo Smart Lock L510', nameEs: 'Cerradura Inteligente Tapo L510', price: 89.99, image: 'https://m.media-amazon.com/images/I/61TnXqhZt6L._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B0CQTD1SJF' },
  { id: 14, name: 'SwitchBot Smart Button Pusher', nameEs: 'SwitchBot Pulsador Inteligente', price: 29.99, image: 'https://m.media-amazon.com/images/I/51JXxpEQoFL._AC_SL1500_.jpg', category: 'smarthome', categoryEs: 'Hogar Inteligente', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B07B7NXV4R' },
  // TV Mounts
  { id: 15, name: 'Perlegear Full Motion Mount 26–65"', nameEs: 'Soporte Full Motion Perlegear 26–65"', price: 35.99, image: 'https://m.media-amazon.com/images/I/71Iq7JUPpCL._AC_SL1500_.jpg', category: 'tvmount', categoryEs: 'Soportes TV', rating: 5, badge: 'Best Seller', amazonUrl: 'https://www.amazon.com/dp/B07WH4RLTQ' },
  { id: 16, name: 'USX Mount Full Motion 42–90"', nameEs: 'Soporte Full Motion USX 42–90"', price: 49.99, image: 'https://m.media-amazon.com/images/I/71kbjzRlFKL._AC_SL1500_.jpg', category: 'tvmount', categoryEs: 'Soportes TV', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B08CXRTM7J' },
  { id: 17, name: 'Mounting Dream Tilt Mount 37–75"', nameEs: 'Soporte Inclinable Mounting Dream 37–75"', price: 39.99, image: 'https://m.media-amazon.com/images/I/71lsJHMzaFL._AC_SL1500_.jpg', category: 'tvmount', categoryEs: 'Soportes TV', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B00YQWBEWG' },
  { id: 18, name: 'EchoGear Full Motion Corner Mount 65"', nameEs: 'Soporte Esquinero EchoGear 65"', price: 69.99, image: 'https://m.media-amazon.com/images/I/71eGGwi3k7L._AC_SL1500_.jpg', category: 'tvmount', categoryEs: 'Soportes TV', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B01MYFJ8JV' },
  { id: 19, name: 'Perlegear Heavy Duty Mount 42–90"', nameEs: 'Soporte Resistente Perlegear 42–90"', price: 59.99, image: 'https://m.media-amazon.com/images/I/71KFTi8JSSL._AC_SL1500_.jpg', category: 'tvmount', categoryEs: 'Soportes TV', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B08F3ZJW85' },
  // Network
  { id: 20, name: 'TP-Link Deco Mesh WiFi 6 (3-pack)', nameEs: 'TP-Link Deco Mesh WiFi 6 (paquete 3)', price: 149.99, image: 'https://m.media-amazon.com/images/I/71PkHJ7MXFL._AC_SL1500_.jpg', category: 'network', categoryEs: 'Red & WiFi', rating: 5, badge: 'Best Seller', amazonUrl: 'https://www.amazon.com/dp/B08BHLYK1Q' },
  { id: 21, name: 'ASUS RT-AX88U Pro WiFi 6 Router', nameEs: 'Router ASUS RT-AX88U Pro WiFi 6', price: 249.99, image: 'https://m.media-amazon.com/images/I/81CkOkFnPFL._AC_SL1500_.jpg', category: 'network', categoryEs: 'Red & WiFi', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B08BJHKPKZ' },
  { id: 22, name: 'Netgear Nighthawk WiFi 6E Router', nameEs: 'Router Netgear Nighthawk WiFi 6E', price: 199.99, image: 'https://m.media-amazon.com/images/I/71pZ7IGMSSL._AC_SL1500_.jpg', category: 'network', categoryEs: 'Red & WiFi', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B09BGV6ZZW' },
  { id: 23, name: 'TP-Link TL-SG108 8-Port Gigabit Switch', nameEs: 'Switch Gigabit TP-Link 8 Puertos', price: 24.99, image: 'https://m.media-amazon.com/images/I/61xbfZeBFjL._AC_SL1500_.jpg', category: 'network', categoryEs: 'Red & WiFi', rating: 5, badge: 'Best Value', amazonUrl: 'https://www.amazon.com/dp/B00A121WN6' },
  // LED & Lights
  { id: 24, name: 'Govee RGBIC LED Strip 32.8ft', nameEs: 'Tira LED RGBIC Govee 10m', price: 39.99, image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg', category: 'lights', categoryEs: 'Luces LED', rating: 5, badge: 'Best Seller', amazonUrl: 'https://www.amazon.com/dp/B09MFLNK5Q' },
  { id: 25, name: 'Philips Hue White & Color A19 (2-pack)', nameEs: 'Philips Hue Blanco y Color A19 (2 pack)', price: 44.99, image: 'https://m.media-amazon.com/images/I/51j3Htqk2ZL._AC_SL1500_.jpg', category: 'lights', categoryEs: 'Luces LED', rating: 5, amazonUrl: 'https://www.amazon.com/dp/B01M9AU8MB' },
  { id: 26, name: 'Govee Glide Hexa Light Panels', nameEs: 'Paneles de Luz Hexagonales Govee', price: 89.99, image: 'https://m.media-amazon.com/images/I/81p3pmMHR8L._AC_SL1500_.jpg', category: 'lights', categoryEs: 'Luces LED', rating: 4, amazonUrl: 'https://www.amazon.com/dp/B09G5QKJLH' },
  { id: 27, name: 'Kasa Smart Multicolor Bulbs (4-pack)', nameEs: 'Bombillas Inteligentes Kasa (paquete 4)', price: 34.99, image: 'https://m.media-amazon.com/images/I/71F4d3BKMsL._AC_SL1500_.jpg', category: 'lights', categoryEs: 'Luces LED', rating: 4, badge: 'Best Value', amazonUrl: 'https://www.amazon.com/dp/B08H87NQQP' },
];

  filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all' ? this.products : this.products.filter(p => p.category === cat);
  });

  get currentLang() {
    return this.translate.currentLang || 'en';
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.addedProductId.set(product.id);
    setTimeout(() => this.addedProductId.set(null), 1500);
  }

  toggleCart() {
    this.showCart.update(v => !v);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
}