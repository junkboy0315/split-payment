import { PersonListService } from './personlist.service';
import { Person } from './person.model';

describe('PersonListService', () => {
  let personListService;

  beforeEach(() => {
    personListService = new PersonListService();
  });

  it('should set initial values', () => {
    expect(personListService.personList.length).toBe(0);
    expect(personListService.totalPay).toBe(undefined);
    expect(personListService.adjustmentUnit).toBe(undefined);
  })

  it('should calculate adjustment unit when changing totalPay', () => {
    personListService.totalPay = 100;
    expect(personListService.adjustmentUnit).toBe(5);

    personListService.totalPay = 1000;
    expect(personListService.adjustmentUnit).toBe(50);

    personListService.totalPay = 10000;
    expect(personListService.adjustmentUnit).toBe(500);
  })

  it('should add person', () => {
    personListService.addPerson();
    personListService.addPerson();

    expect(personListService.personList.length).toBe(2);
    expect(personListService.personList[0] instanceof Person).toBe(true);
    expect(personListService.personList[1] instanceof Person).toBe(true);
  })

  it('should delete person', () => {
    personListService.addPerson();
    personListService.addPerson();

    const target = personListService.personList[0]

    personListService.deletePerson(target);

    expect(personListService.personList.length).toBe(1);
    expect(personListService.personList[0]).not.toBe(target);
  })

  it('should increase payment', () => {
    personListService.totalPay = 10000;
    personListService.addPerson();
    personListService.addPerson();
    personListService.addPerson();

    const p1 = personListService.personList[0]
    const p2 = personListService.personList[1]
    const p3 = personListService.personList[2]

    expect(p1.payment).toBe(3333);
    expect(p2.payment).toBe(3333);
    expect(p3.payment).toBe(3333);

    personListService.increasePaymentOf(p1)

    // add fraction (only first time)
    expect(p1.payment).toBe(3500);
    expect(p2.payment).toBe(3250);
    expect(p3.payment).toBe(3250);

    personListService.increasePaymentOf(p1)

    // add adjuctment unit
    expect(p1.payment).toBe(4000);
    expect(p2.payment).toBe(3000);
    expect(p3.payment).toBe(3000);
  })


  it('should decrease payment', () => {
    personListService.totalPay = 10000;
    personListService.addPerson();
    personListService.addPerson();
    personListService.addPerson();

    const p1 = personListService.personList[0]
    const p2 = personListService.personList[1]
    const p3 = personListService.personList[2]

    expect(p1.payment).toBe(3333);
    expect(p2.payment).toBe(3333);
    expect(p3.payment).toBe(3333);

    personListService.decreasePaymentOf(p1)

    // minus fraction (only first time)
    expect(p1.payment).toBe(3000);
    expect(p2.payment).toBe(3500);
    expect(p3.payment).toBe(3500);

    personListService.decreasePaymentOf(p1)

    // minus adjuctment unit
    expect(p1.payment).toBe(2500);
    expect(p2.payment).toBe(3750);
    expect(p3.payment).toBe(3750);
  })

  it('should toggle \'fixed\' status', () => {
    personListService.addPerson();
    personListService.addPerson();

    const target = personListService.personList[0]

    personListService.toggleFixedPaymentOf(target);

    expect(personListService.personList[0].fixed).toBe(true);
    expect(personListService.personList[1].fixed).toBe(false);
  })

  it('should recalc correctly', () => {
    personListService.totalPay = 10000;
    personListService.addPerson();
    personListService.addPerson();
    personListService.recalc();

    expect(personListService.personList[0].payment).toBe(5000);
    expect(personListService.personList[1].payment).toBe(5000);
  })

  it('should recalc correctly(contain fixed)', () => {
    personListService.totalPay = 10000;
    personListService.addPerson();
    personListService.addPerson();
    personListService.addPerson();
    personListService.personList[0].fixed = true;
    personListService.personList[0].payment = 5000;
    personListService.recalc();

    expect(personListService.personList[0].payment).toBe(5000);
    expect(personListService.personList[1].payment).toBe(2500);
    expect(personListService.personList[2].payment).toBe(2500);
  })
});
