import { Person } from './person.model';

export class PersonListService {
  public personList: Person[] = [];
  private adjustmentUnit: number;
  private _totalPay: number;

  get totalPay() {
    return this._totalPay;
  }

  set totalPay(val) {
    if (!val) return;
    this._totalPay = val;

    // Determine the unit of adjustment when increasing or decreasing payment.
    // If totalPay is 3 digits, unit should be 5
    // If totalPay is 4 digits, unit should be 50
    // If totalPay is 5 digits, unit should be 500  and so on
    const digit = Number(this.totalPay.toString().length);
    this.adjustmentUnit = 5 * 10 ** (digit - 3);

    // recalc
    this.recalc();
  }

  addPerson() {
    this.personList.push(new Person());
    this.recalc();
  }

  deletePerson(person: Person) {
    this.personList.splice(this.personList.indexOf(person), 1);
    this.recalc();
  }

  increasePaymentOf(person: Person) {
    const fraction = person.payment % this.adjustmentUnit;

    person.adjustPaymentBy(-fraction);
    person.adjustPaymentBy(this.adjustmentUnit);
    person.fixed = true;

    this.recalc();
  }

  decreasePaymentOf(person: Person) {
    const fraction = person.payment % this.adjustmentUnit;

    if (fraction === 0) {
      person.adjustPaymentBy(-this.adjustmentUnit);
    } else {
      person.adjustPaymentBy(-fraction);
    }

    person.fixed = true;
    this.recalc();
  }

  toggleFixedPaymentOf(person: Person) {
    person.toggleFixed();
    this.recalc();
  }

  recalc() {
    if (!this.totalPay) {
      return;
    }

    // calculate the sum of payments marked 'Fix'
    const countOfFixed = this.personList.filter(person => person.fixed === true)
      .length;

    const totalOfFixed = this.personList
      .filter(person => person.fixed === true)
      .map(person => person.payment)
      .reduce((prev, next) => {
        return prev + next;
      }, 0);

    // calculate payment for each person other than 'Fix'ed person
    const paymentPerPerson =
      (this.totalPay - totalOfFixed) / (this.personList.length - countOfFixed);
    this.personList.filter(person => person.fixed === false).forEach(person => {
      person.payment = Math.floor(paymentPerPerson);
    });
  }
}
