import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { Observable, Subscription, filter, map } from "rxjs";
import { Category } from '../../types/category.type';
import { Keyword } from '../../types/keyword.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CategoryStoreData } from '../../services/CategoryServices/category.storeData';
import { CartStoreData } from '../../services/CartServices/cart.storeData';
import { UserService } from '../../services/UserServices/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, MdbCollapseModule, MdbDropdownModule,
    AsyncPipe, RouterLink
   ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy{

  subscriptions: Subscription = new Subscription();

  @Output()
  searchClicked: EventEmitter<Keyword> = new EventEmitter<Keyword>();

  displayOptions: boolean = true;
  isUserLogged: boolean = false;
  userName: string = '';

  selectedGenre: string = '';
  onSelectGenre(genre: string){
    this.selectedGenre = genre;
  }

  constructor(public storeData: CategoryStoreData, public cart: CartStoreData, private router: Router, public service: UserService){
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => 
      this.displayOptions = (e as NavigationEnd).url === '/home/films' ? true: false
    );
    
    this.subscriptions.add(this.service.$isUserLogged.subscribe((result) => {
      this.isUserLogged = result;
    }));
    this.subscriptions.add(this.service.$loggedUserInfo.subscribe((result) => {
      this.userName = result.name;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(){
    this.service.logout();
  }

  getCategories(): Observable<Category[]>{
    return this.storeData.$categories.pipe(map(c => c.filter(a => a.parent_category_id === null)));
  }

  onSearchClicked(id: string, search: string){
    if(!id){
      alert("Please choose a catergory! Recommend: Films and 'Vampire' for search");
    }
    else if(!search){
      alert("What should I search for?");
    }
    this.searchClicked.emit({category_id: parseInt(id), keyword: search.toLocaleLowerCase()});
  }

}
