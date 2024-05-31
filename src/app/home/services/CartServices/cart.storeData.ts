import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../../types/cart.types";
import { StoreData } from "../reusable/storeData";
import { totalmem } from "os";
import { Observable } from "rxjs";
import { Film } from "../../types/films.type";

@Injectable()
export class CartStoreData extends StoreData<Cart> {

    constructor() {
        if (typeof sessionStorage !== 'undefined') {
        const savedCart = sessionStorage.getItem('cart');
        if(savedCart){
            super(JSON.parse(savedCart));
        }else{
        super({
            cartItems: [],
            totalAmount: 0,
            totalItems: 0
        });
        }
        }
        else{
            super({
                cartItems: [],
                totalAmount: 0,
                totalItems: 0
            });
        }

    }

    get $cart(): Observable<Cart>{
        return this.$value;
    }
    
    get cart(): Cart{
        return this.value;
    }

    addFilm(film: Film){
        const cartFilm: CartItem | undefined = this.cart.cartItems.find(
            f => f.film.id === film.id
        );

        if(!cartFilm){
            this.cart.cartItems =[
                ...this.cart.cartItems,
                {
                    film: film,
                    quantity: 1,
                    amount: Number(film.price)
                }
            ];
        }else{
            cartFilm.quantity++;
            cartFilm.amount += Number(film.price);
        }
        this.cart.totalAmount += Number(film.price);
        ++this.cart.totalItems;
        this.saveCart();
    }

    removeProduct(cartItem: CartItem){
        this.cart.cartItems = this.cart.cartItems.filter(
            f => f.film.id !== cartItem.film.id
        );
        this.cart.totalItems -= cartItem.quantity;
        this.cart.totalAmount -= cartItem.amount;
        if(this.cart.totalItems === 0){
            sessionStorage.clear();
        }else this.saveCart();
    }

    deacreaseQuantity(cartItem: CartItem){
        const filmInCart: CartItem | undefined = this.cart.cartItems.find(f => f.film.id === cartItem.film.id);
        if(filmInCart){
            if(filmInCart.quantity === 1){
                this.removeProduct(filmInCart);
            }else{
                filmInCart.quantity--;
                this.cart.totalAmount -= Number(filmInCart.film.price);
                filmInCart.amount -= Number(filmInCart.film.price);
                --this.cart.totalItems;
                this.saveCart();
            }
        }
    }

    saveCart(){
        sessionStorage.clear();
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

}