import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/FimServices/films.service';
import { Film } from '../../types/films.type';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../../../rating/rating.component';
import { CartStoreData } from '../../services/CartServices/cart.storeData';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [ CurrencyPipe, RatingComponent ],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss'
})
export class FilmDetailsComponent implements OnInit, OnDestroy {

  film: Film;
  subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private service: FilmsService, private cart: CartStoreData){

  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
    this.service.getFilmById(id).subscribe(f => this.film = f[0]));
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCart(){
    this.cart.addFilm(this.film);
  }

}
