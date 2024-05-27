import { Component, EventEmitter, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../types/category.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { CategoryStoreData } from '../../services/CategoryServices/category.storeData';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ AsyncPipe, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output()
  mainCategoryClicked: EventEmitter<number> = new EventEmitter<number>();

  displayCategory: boolean = true;

  constructor(public storeData: CategoryStoreData, private router: Router){
    router.events.pipe(filter(e=>
      e instanceof NavigationEnd
    )).subscribe(
      e => this.displayCategory = (e as NavigationEnd).url === '/home/films'? true:false
    );
  }

  selectOption(category: Category){
    this.mainCategoryClicked.emit(category.id);
  }

}
