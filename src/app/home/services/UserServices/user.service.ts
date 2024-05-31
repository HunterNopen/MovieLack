import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, loggedUser, loginToken } from '../../types/user.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInUser: BehaviorSubject<loggedUser> = new BehaviorSubject(<loggedUser>{});
  private autoLogoutTimer: any;

  constructor(private client: HttpClient) {
    this.loadToken();
   }

  get isUserLogged(): boolean{
    return this.isLogged.value;
  }
  get $isUserLogged(): Observable<boolean>{
    return this.isLogged.asObservable();
  } 

  get $loggedUserInfo(): Observable<loggedUser>{
    return this.loggedInUser.asObservable();
  }

  createUser(user: User): Observable<any>{
    const url: string = 'http://localhost:5001/users/register';
    return this.client.post(url, user);
  }

  loginUser(user: any): Observable<any>{
    const url: string = 'http://localhost:5001/users/login';
    return this.client.post(url, user);
  }

  logout(){
    localStorage.clear();
    this.isLogged.next(false);
    this.loggedInUser.next(<loggedUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  loadToken(){
    if (typeof localStorage !== 'undefined') {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if(!token || !expiry){
      return;
    }else{
      const expiresIn: number = new Date(expiry).getTime() - new Date().getTime();
      if(expiresIn > 0){
        const name: string | null = localStorage.getItem('name');
        const surname: string | null = localStorage.getItem('surname');
        const address: string | null = localStorage.getItem('address');
        const state: string | null = localStorage.getItem('state');
        const city: string | null = localStorage.getItem('city');
        const pin: string | null = localStorage.getItem('pin');

        const user: loggedUser ={
          name: name !== null ? name : '',
          surname: surname !== null ? surname : '',
          address: address !== null ? address : '',
          city: city !== null ? city : '',
          state: state !== null ? state : '',
          pin: pin !== null ? pin : '',
        }

        this.isLogged.next(true);
        this.loggedInUser.next(user);
        this.setAutoLogoutTimer(expiresIn);
      }else{
        this.logout();
      }
    }
  }
  }

  private setAutoLogoutTimer(duration: number){
    this.autoLogoutTimer = setTimeout(()=>{
      this.logout();
    }, duration);
  }

  activateToken(token: loginToken){
    if (typeof localStorage !== 'undefined') {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());
    localStorage.setItem('name', token.user.name);
    localStorage.setItem('surname', token.user.surname);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('pin', token.user.pin);

    this.isLogged.next(true);
    this.loggedInUser.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
  }
  }
}
