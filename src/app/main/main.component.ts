import { Component, OnInit } from '@angular/core';
import {
  animate,
  group,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Person } from '../shared/person.model';
import { PersonListService } from '../shared/personlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

  // see: https://coursetro.com/posts/code/78/Creating-Stagger-Animations-in-Angular-4
  // see: https://www.yearofmoo.com/2017/06/new-wave-of-animation-features.html
  animations: [
    trigger('onPersonListChange', [
      transition('* => *', [

        // to run 3 queries at a time
        group([
          // search all the entering element inside [@onPersonListChange] is placed
          query(':enter',
            animate('0.15s ease-in', keyframes([
              style({opacity: 0, transform:'translateX(-50%)', offset: 0}),
              style({opacity: 1, transform:'translateX(0%)', offset: 1}),
            ]))
          , {optional: true}),

          query(':leave',
            animate('0.15s ease-out', keyframes([
              style({opacity: 1.0, transform:'scaleY(1)', height: '100%', offset: 0}),
              style({opacity: 0.0, transform:'scaleY(0)', height: 0, padding: 0, offset: 1}),
            ]))
          , {optional: true}),

          query('#total-person-count',
            animate('0.07s linear', keyframes([
              style({opacity: 1.0, transform:'scale(1)', offset: 0}),
              style({opacity: 1.0, transform:'scale(1.5)', offset: .2}),
              style({opacity: 1.0, transform:'scale(1)', offset: 1}),
            ]))
          , {optional: true}),
        ])

      ]),
    ]),
  ],
})
export class MainComponent {
  constructor(
    public personListService: PersonListService,
  ){}

  recalc() {
    this.personListService.recalc();
  }

  addPerson() {
    this.personListService.addPerson();
  }
}
