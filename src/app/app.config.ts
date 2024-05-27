import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FilmStoreData } from './home/services/FimServices/films.storeData';
import { FilmsService } from './home/services/FimServices/films.service';
import { CategoryService } from './home/services/CategoryServices/category.service';
import { CategoryStoreData } from './home/services/CategoryServices/category.storeData';
import { UpdaterService } from './home/services/FimServices/updater.service';
import { CartStoreData } from './home/services/CartServices/cart.storeData';
import { Session } from 'inspector';
import { UserService } from './home/services/UserServices/user.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), 
    provideHttpClient(), CategoryService, CategoryStoreData, UpdaterService, FilmStoreData, FilmsService, RouterModule, CartStoreData, UserService]
};
