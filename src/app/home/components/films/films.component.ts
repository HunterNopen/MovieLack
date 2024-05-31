import { Component, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RatingComponent } from '../../../rating/rating.component';
import { Film } from '../../types/films.type';
import { FilmStoreData } from '../../services/FimServices/films.storeData';
import { RouterLink } from '@angular/router';
import { CartStoreData } from '../../services/CartServices/cart.storeData';
import { skip, take, toArray } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [ RatingComponent,
    CurrencyPipe, TitleCasePipe, SlicePipe, AsyncPipe,
    RouterLink, CommonModule
    ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent implements OnDestroy{

  subscriptions: Subscription = new Subscription();
  filmsOnPage: Film[];
  maxPerPage: number = 6;
  maxPages: number = 0;
  page: number = 0;

  constructor(public storeFilm: FilmStoreData, private cart: CartStoreData){
    this.subscriptions.add(this.storeFilm.films$.subscribe( r =>{
      this.filmsOnPage = r;
      this.maxPages = Math.ceil(r.length / this.maxPerPage);
    }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCart(film: Film){
    this.cart.addFilm(film);
  }

  showFilms(page: number): Film[]{
    return this.filmsOnPage.slice(page*this.maxPerPage, page*this.maxPerPage+this.maxPerPage);
  }

  nextPage(){
    this.page++;
  }
  previousPage(){
    this.page--;
  }
  
  hasNextPage(): boolean {
    return this.page < this.maxPages-1;
  }
}
