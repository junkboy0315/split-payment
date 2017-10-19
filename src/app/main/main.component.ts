import { Component, OnInit } from '@angular/core';

import { Person } from '../shared/person.model';
import { PersonListService } from '../shared/personlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
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

  deletePerson(index: number) {
    this.personListService.deletePerson(index);
  }

  increasePaymentOf(person: Person) {
    this.personListService.increasePaymentOf(person);
  }

  decreasePaymentOf(person: Person) {
    this.personListService.decreasePaymentOf(person);
  }

  toggleFixedPaymentOf(person: Person) {
    this.personListService.toggleFixedPaymentOf(person);
  }

}
