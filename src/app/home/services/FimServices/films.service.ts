import { Injectable } from '@angular/core';
import { Film } from '../../types/films.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class FilmsService {

  constructor(private client: HttpClient) { }

  getFilmList(query?: string): Observable<Film[]>{
    let url = 'http://localhost:5001/films';
    if(query){
      url += '?' + query;
    }

    return this.client.get<Film[]>(url);
  }

  getFilmById(id: number): Observable<Film[]>{
    let url = 'http://localhost:5001/films/'+id;

    return this.client.get<Film[]>(url);
  }
}
