import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../types/category.type';


@Injectable()
export class CategoryService {

  constructor(private client: HttpClient) { }

  getAllCategories() : Observable<Category[]>{
    return this.client.get<Category[]>(
      'http://localhost:5001/filmCategories'
    );
  }
}
