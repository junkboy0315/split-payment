import { Component } from '@angular/core';

import Person from './shared/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalPay: number;
  people: Person[] = [];
  adjustmentUnit: number;

  recalc() {
    // 端数処理の単位を設定　5桁なら500円、4桁なら50円、3桁なら5円
    let num = this.totalPay;
    let keta = 0;
    while(num >= 1) {
      num /= 10;
      keta += 1;
    };
    this.adjustmentUnit = 10 ** (keta - 3) * 5

    // calculate the sum of payments marked 'Fix'
    const countOfFixed = this.people
      .filter(person => person.fixed === true)
      .length;

    const totalOfFixed = this.people
      .filter(person => person.fixed === true)
      .map(person => person.payment)
      .reduce((prev, next) => { return prev + next }, 0);

    // calculate payment for each person other than 'Fix'ed person
    const paymentPerPerson = (this.totalPay - totalOfFixed) / (this.people.length - countOfFixed);
    this.people
    .filter(person => person.fixed === false)
    .forEach((person) => {
      person.payment = paymentPerPerson;
    })

  }

  addPerson() {
    this.people.push(new Person());
    this.recalc();
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
    this.recalc();
  }

  increasePaymentOf(person: Person) {
    const fraction = person.payment % this.adjustmentUnit;

    person.adjustPayment(-fraction);
    person.adjustPayment(this.adjustmentUnit);
    person.fixed = true;

    this.recalc();
  }

  decreasePaymentOf(person: Person) {
    const fraction = person.payment % this.adjustmentUnit;

    if(fraction === 0) {
      person.adjustPayment(-this.adjustmentUnit);
    } else {
      person.adjustPayment(-fraction);
    }

    person.fixed = true;
    this.recalc();
  }

  toggleFixedPayment(person: Person) {
    person.toggleFixed();
    this.recalc();
  }
}
