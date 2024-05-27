import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [ CommonModule,  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  private _score: number = 0;

  @Input()
  set score(val: number){
    this._score = val > 5 ? 5 : val;
    this._score = val < 1 ? 1 : val;
  }

  getFullStars(){
    return new Array(Math.floor(this._score));
  }
  getHalfStar(){
    return this._score - this.getFullStars().length > 0 && this._score - this.getFullStars().length < 1 && this.getFullStars().length != 5 ? true : false;
  }
  getEmptyStar(){
    let count = Math.floor(5-this._score);
    return count<1?null:new Array(count);
  }
}
