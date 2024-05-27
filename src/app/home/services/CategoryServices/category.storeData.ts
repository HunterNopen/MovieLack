import { Injectable } from "@angular/core";
import { CategoryService } from "./category.service";
import { Observable, map } from "rxjs";
import { Category } from "../../types/category.type";
import { StoreData } from "../reusable/storeData";

@Injectable()
export class CategoryStoreData extends StoreData<Category[]>{
    
    constructor(private service: CategoryService){
        super([]);
    }

    async loadCategories(){
        this.service.getAllCategories().subscribe((categories) => {
            this.setValue(categories);
        });
    }

    get $categories(): Observable<Category[]>{
        return this.$value;
    }

    get topLevelCategories(): Observable<Category[]>{
        return this.$value.pipe(
            map(categories => 
            categories.filter(cat => cat.parent_category_id === null))
        );
    }
}