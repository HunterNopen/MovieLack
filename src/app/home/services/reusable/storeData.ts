import { BehaviorSubject, Observable } from "rxjs";

export class StoreData<T>{
    private $state: BehaviorSubject<T>;
    
    protected constructor(init: T){
        this.$state = new BehaviorSubject(init);
    }

    protected setValue(val: T){
        this.$state.next(val);
    }

    protected get $value(): Observable<T>{
        return this.$state.asObservable();
    }

    protected get value(): T{
        return this.$state.value;
    }
}