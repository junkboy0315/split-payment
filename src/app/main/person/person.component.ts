import { Component, Input, OnInit } from '@angular/core';

import { Person } from '../../shared/person.model';
import { PersonListService } from '../../shared/personlist.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() person: Person;
  @Input() index: number;

  constructor(public personListService: PersonListService) {}

  onEditPaymentOf(person: Person) {
    person.fixed = true;
    this.personListService.recalc();
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

  deletePerson(person: Person) {
    this.personListService.deletePerson(person);
  }
}
