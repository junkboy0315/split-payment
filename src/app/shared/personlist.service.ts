import { Person } from './person.model';

export class PersonListService {
  public personList: Person[] = [];
  public adjustmentUnit: number;
  public totalPay: number;

  addPerson() {
    if(!this.totalPay){
      alert('Enter the total payment first.');
      return;
    }

    this.personList.push(new Person);
    this.recalc();
  }

  deletePerson(person: Person) {
    this.personList.splice(this.personList.indexOf(person), 1);
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

  toggleFixedPaymentOf(person: Person) {
    person.toggleFixed();
    this.recalc();
  }

  recalc() {
    // 端数処理の単位を設定　5桁なら500円、4桁なら50円、3桁なら5円
    const digit = Number(this.totalPay.toString().length)
    this.adjustmentUnit = 5 * (10 ** (digit - 3))

    // calculate the sum of payments marked 'Fix'
    const countOfFixed = this.personList
      .filter(person => person.fixed === true)
      .length;

    const totalOfFixed = this.personList
      .filter(person => person.fixed === true)
      .map(person => person.payment)
      .reduce((prev, next) => { return prev + next }, 0);

    // calculate payment for each person other than 'Fix'ed person
    const paymentPerPerson = (this.totalPay - totalOfFixed) / (this.personList.length - countOfFixed);
    this.personList
      .filter(person => person.fixed === false)
      .forEach((person) => {
        person.payment = paymentPerPerson;
      })

  }
}
