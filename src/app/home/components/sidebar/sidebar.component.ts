import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Category } from '../../types/category.type';
import { Subscription } from 'rxjs';
import { CategoryStoreData } from '../../services/CategoryServices/category.storeData';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule,  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy{

  @Output()
  subCategoryClicked: EventEmitter<number> = new EventEmitter<number>();

  filmCategories: Category[] = [];
  optionSelected?: Category;
  isOpen: boolean[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(storeData: CategoryStoreData){
    this.subscriptions.add(storeData.$categories.subscribe(cat => {
      this.filmCategories = cat;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleDropdown(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }

  getCategories(parentCategoryId?: number): Category[]{
    return this.filmCategories.filter(f => parentCategoryId ? f.parent_category_id === parentCategoryId : f.parent_category_id === null);
  }

  selectOption(option: Category) {
    this.subCategoryClicked.emit(option.id);
  }

}
