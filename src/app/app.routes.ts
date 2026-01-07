import { Routes } from '@angular/router';
import { Auth } from './page/auth/auth';
import { authGuard } from './core/guard/auth.guard';
import { HomeComponent } from './page/home/home';
import { Form } from './shared/form/form';

export const routes: Routes = [
    {
        path: 'login',
        component: Auth
    },
    {   path: 'register', 
        component: Form 
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
