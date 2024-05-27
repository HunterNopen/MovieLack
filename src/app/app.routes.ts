import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Component } from '@angular/core';
import { FilmGalleryComponent } from './home/components/film-gallery/film-gallery.component';
import { FilmDetailsComponent } from './home/components/film-details/film-details.component';
import { CartComponent } from './home/components/cart/cart.component';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), children:
        [
            { path: 'films', component: FilmGalleryComponent },
            { path: 'film/:id', component: FilmDetailsComponent },
            { path: 'cart', component: CartComponent },
        ]
     },
    { path: 'registration',  loadComponent: () => import('./home/components/users/user-registration/user-registration.component').then(m => m.UserRegistrationComponent) },
    { path: 'login',  loadComponent: () => import('./home/components/users/user-login/user-login.component').then(m => m.UserLoginComponent) },
    { path: '', redirectTo: '/home/films', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent, },
];
