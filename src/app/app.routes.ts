import { Routes } from '@angular/router';
import { SingnUpComponent } from './singn-up/singn-up.component';
import { SingnInComponent } from './singn-in/singn-in.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    { path: '', component: SingnInComponent },

    { path: 'signin', component: SingnInComponent },
    { path: 'signup', component: SingnUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dashbaord', component: DashboardComponent },
];
