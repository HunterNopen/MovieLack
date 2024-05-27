import { Film } from "./films.type";


export interface CartItem {
    film: Film;
    quantity: number;
    amount: number;
}

export interface Cart{
    cartItems: CartItem[];
    totalAmount: number;
    totalItems: number;
}