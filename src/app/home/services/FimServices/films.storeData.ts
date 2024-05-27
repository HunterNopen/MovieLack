import { Injectable } from "@angular/core";
import { StoreData } from "../reusable/storeData";
import { Film } from "../../types/films.type";
import { FilmsService } from "./films.service";
import { Observable } from "rxjs";

@Injectable()
export class FilmStoreData extends StoreData<Film[]>{
    
    constructor(private service: FilmsService){
        super([]);
    }

    async loadFilms(query?: string){
        this.service.getFilmList(query).subscribe(p => this.setValue(p));
    }

    get films$(): Observable<Film[]>{
        return this.$value;
    }

    get films(): Film[]{
        return this.value;
    }
}   