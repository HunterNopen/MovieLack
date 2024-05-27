import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmStoreData } from './services/FimServices/films.storeData';
import { Keyword } from './types/keyword.type';
import { FilmGalleryComponent } from './components/film-gallery/film-gallery.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CategoryStoreData } from './services/CategoryServices/category.storeData';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilmsComponent, FilmGalleryComponent, HeaderComponent, NavbarComponent, 
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private storeDataCategory: CategoryStoreData, private storeDataFilms: FilmStoreData, private router: Router ){
    this.storeDataCategory.loadCategories();
    this.storeDataFilms.loadFilms();
    router.events.pipe(filter(l => l instanceof NavigationEnd)).subscribe( l =>{
      if((l as NavigationEnd).url === '/home'){
        router.navigate(['/home/films']);
      }
      });
  }

  onSelectMainCategory(id: number){
    this.storeDataFilms.loadFilms('mainCategoryId='+id);
  }

  onSearch(keyword: Keyword){
    this.storeDataFilms.loadFilms('mainCategoryId='+keyword.category_id+"&keyword="+keyword.keyword);
  }
}
