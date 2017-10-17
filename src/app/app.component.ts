import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalPay: number = 0;
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
    person.payment -= person.payment % this.adjustmentUnit;
    person.payment += this.adjustmentUnit;
    person.fixed = true;

    this.recalc();
  }

  decreasePaymentOf(person: Person) {
    if(person.payment % this.adjustmentUnit != 0) {
      person.payment -= person.payment % this.adjustmentUnit;
    } else {
      person.payment -= this.adjustmentUnit;
    }
    person.fixed = true;
    this.recalc();
  }

  toggleFixedPayment(person: Person) {
    person.fixed = !person.fixed;
    this.recalc();
  }
}

class Person {
  payment: number;
  fixed: boolean;

  constructor() {
    this.payment = 0;
    this.fixed = false;
  }
}
