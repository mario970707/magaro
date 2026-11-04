import { Component, ViewEncapsulation, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [TranslateModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',

  encapsulation: ViewEncapsulation.None
})

export class Services {
  tier = signal<'normal' | 'premium'>('normal');

  // Cantidad de cada dispositivo por plan. 0 = se puede añadir como extra.
  rows = ['hub', 'voice', 'lock', 'cameras', 'thermostat', 'lights', 'curtains', 'sensors', 'tablet'];
  plans = [
    { key: 'apt', top: false, qty: [1, 1, 1, 3, 0, 0, 0, 0, 0] },
    { key: 'house', top: true, qty: [1, 1, 1, 3, 1, 8, 2, 0, 0] },
    { key: 'super', top: false, qty: [1, 2, 1, 4, 1, 15, 4, 6, 1] },
  ];

  addons = [
    { key: 'device', price: '$75' },
    { key: 'scene', price: '$50' },
    { key: 'leak', price: '$60' },
    { key: 'tvcontrol', price: '$75' },
    { key: 'tvmount', price: '$90' },
    { key: 'tvfull', price: '$175' },
    { key: 'router', price: '$85' },
    { key: 'mesh', price: '$199' },
    { key: 'bizdnet', price: '$350' },
    { key: 'printer', price: '$65' },
    { key: 'remote', price: '$55' },
    { key: 'onsite', price: '$95' },
    { key: 'care', price: '$29' },
    { key: 'bizsupport', price: '$149' },
  ];
}
