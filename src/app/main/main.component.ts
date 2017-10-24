import { Component, OnInit } from '@angular/core';

import { Person } from '../shared/person.model';
import { PersonListService } from '../shared/personlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
