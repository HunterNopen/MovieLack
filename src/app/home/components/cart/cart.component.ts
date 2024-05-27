import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from 'express';
import { CartStoreData } from '../../services/CartServices/cart.storeData';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../../../rating/rating.component';
import { CartItem } from '../../types/cart.types';
import { UserService } from '../../services/UserServices/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loggedUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, MdbFormsModule,
    RatingComponent, ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  orderForm: FormGroup;
  user: loggedUser;
  subscriptions: Subscription = new Subscription();

  constructor(public cart: CartStoreData, public service: UserService, private builder: FormBuilder) {
    this.user = {
      name: '',
      surname: '',
      address: '',
      state: '',
      city: '',
      pin: '',
    };

    this.subscriptions.add(
      service.$loggedUserInfo.subscribe(r => {
        if (r.name) {
          this.user = r;
        }
      })
    )
  }

  ngOnInit(): void {
    this.orderForm = this.builder.group({
      name: [`${this.user.name + this.user.surname}`, [Validators.required]],
      address: [`${this.user.address}`, [Validators.required]],
      state: [`${this.user.state}`, [Validators.required]],
      city: [`${this.user.city}`, [Validators.required]],
      pin: [`${this.user.pin}`, [Validators.required]],

    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateQuantity($event: any, cartItem: CartItem) {
    if ($event.target.innerText === '+') {
      this.cart.addFilm(cartItem.film);
    } else if ($event.target.innerText === '-') {
      this.cart.deacreaseQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem) {
    this.cart.removeProduct(cartItem);
  }

  submitForm(){
    alert('Success');
  }

}
