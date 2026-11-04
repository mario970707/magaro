import { Routes } from '@angular/router';
import { About } from './page/about/about';
import { Contact } from './page/contact/contact';
import { Services } from './page/services/services/services';
import { SmartHome } from './page/services/smart-home/smart-home';
import { Products } from './page/services/products/products';
import { Home } from "./page/home/home";

export const routes: Routes = [
    { path: '', component: Home, title: 'MaGaRo Fix It | Home' },
    { path: 'about', component: About, title: 'MaGaRo Fix It | About' },
    { path: 'contact', component: Contact, title: 'MaGaRo Fix It | Contact' },
    {
      path: 'services',
      children: [
        { path: '', component: Services, title: 'MaGaRo Fix It | Services' },
        { path: 'services', component: Services, title: 'MaGaRo Fix It | Services List' },
        // { path: 'products', component: Products, title: 'MaGaRo Fix It | Products' },
        { path: 'smart-home', component: SmartHome, title: 'MaGaRo Fix It | Smart Home' }
      ],
    },
  
    { path: '**', redirectTo: '' }
  ];


