export class Person {
  constructor(
    public payment: number = 0,
    public fixed:boolean = false,
  ) {}

  adjustPayment(amount: number) {
    this.payment += amount;
  }

  toggleFixed() {
    this.fixed = !this.fixed;
  }
}
