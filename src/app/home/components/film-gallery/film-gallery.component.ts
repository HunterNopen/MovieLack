import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilmsComponent } from '../films/films.component';
import { FilmStoreData } from '../../services/FimServices/films.storeData';

@Component({
  selector: 'app-film-gallery',
  standalone: true,
  imports: [SidebarComponent, FilmsComponent],
  templateUrl: './film-gallery.component.html',
  styleUrl: './film-gallery.component.scss'
})
export class FilmGalleryComponent {

  constructor(private storeData: FilmStoreData){

  }

  onSelectSubCategory(id: number){
    this.storeData.loadFilms('subCategoryId='+id);
  }

}
