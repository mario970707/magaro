import { Routes } from '@angular/router';
import { About } from './page/about/about';
import { Contact } from './page/contact/contact';
import { Services } from './page/services/services/services';
import { SmartHome } from './page/services/smart-home/smart-home';
import { Products } from './page/services/products/products';
import { Home } from "./page/home/home";

export const routes: Routes = [
    { path: '', component: Home, title: 'MaGaRo Fix IT | Home' },
    { path: 'about', component: About, title: 'MaGaRo Fix IT | About' },
    { path: 'contact', component: Contact, title: 'MaGaRo Fix IT | Contact' },
    {
      path: 'services',
      children: [
        { path: '', component: Services, title: 'MaGaRo Fix IT | Services' },
        { path: 'services', component: Services, title: 'MaGaRo Fix IT | Services List' },
        // { path: 'products', component: Products, title: 'MaGaRo Fix IT | Products' },
        { path: 'smart-home', component: SmartHome, title: 'MaGaRo Fix IT | Smart Home' }
      ],
    },
  
    { path: '**', redirectTo: '' }
  ];


