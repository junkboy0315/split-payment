import { protractor, browser, $, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  canDisplayStartPage() {
    // check if:
    // - nabvar-brand is displayed
    // - 'input' element for total payment is displayed
    // - 'add person' button is displayed
    expect($('.navbar-brand').getText()).toBe('SplitBills');
    expect($('input[placeholder="Total"]').isPresent()).toBe(true);
    expect($('button').isPresent()).toBe(true);

    return true;
  }

  canAddPerson() {
    // check if:
    // - person increases when pushing 'add person' button
    $('button')
      .click()
      .then(() => $('button').click())
      .then(() => $('button').click())
      .then(() => {
        expect($$('.list-group-item input').count()).toBe(3);
        return true;
      });
  }

  canCalculateCorrectly() {
    // check if:
    // - this site can calculate split payment correctly with various situation

    // test helper to check if the calculated value is the same as the expected value
    const isResultSameWith = (expectedValues: number[]) => {
      return new Promise(resolve => {
        $$('li.list-group-item input')
          .getAttribute('value')
          .then(calculatedValues => {
            expect(calculatedValues.toString()).toBe(expectedValues.toString());
            resolve();
          });
      });
    };

    // Set total payment to 15000, and add 4 persons
    return (
      $('input')
        .sendKeys('15000')
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => isResultSameWith([3750, 3750, 3750, 3750]))

        // increase person[0]'s payment three times.
        .then(() =>
          $$('.btn-1')
            .get(0)
            .click(),
        )
        .then(() =>
          $$('.btn-1')
            .get(0)
            .click(),
        )
        .then(() =>
          $$('.btn-1')
            .get(0)
            .click(),
        )
        .then(() => isResultSameWith([5000, 3333, 3333, 3333]))

        // decrease person[1]'s payment two times
        .then(() =>
          $$('.btn-2')
            .get(1)
            .click(),
        )
        .then(() =>
          $$('.btn-2')
            .get(1)
            .click(),
        )
        .then(() => isResultSameWith([5000, 2500, 3750, 3750]))

        // increase person[2]'s payment one time
        .then(() =>
          $$('.btn-1')
            .get(2)
            .click(),
        )
        .then(() => isResultSameWith([5000, 2500, 4000, 3500]))

        // add one person
        .then(() => $('button').click())
        .then(() => isResultSameWith([5000, 2500, 4000, 1750, 1750]))

        // delete person[2]
        .then(() =>
          $$('.container-of-person-badge')
            .get(2)
            .click(),
        )
        .then(() => browser.sleep(500)) // wait for animation
        .then(() => isResultSameWith([5000, 2500, 3750, 3750]))

        // change person[3]'s payment to 4000
        .then(() =>
          $$('.list-group-item input')
            .get(3)
            .sendKeys(
              protractor.Key.chord(protractor.Key.CONTROL, 'a'),
              '4000',
            ),
        )
        .then(() => isResultSameWith([5000, 2500, 3500, 4000]))

        // finish
        .then(() => true)
    );
  }

  canFixCorrectly() {
    // check if:
    // - this site can handle person's 'fix'ed status correctly

    // test helper to check if 'fix' state is the same as the expected value
    const isResultSameWith = (expectedValues: boolean[]) => {
      return new Promise(resolve => {
        $$('li.list-group-item .dollar')
          .getAttribute('class')
          .then(classes => {
            // classes => [ 'btn-danger some-other-class', 'some-other-class', 'some-other-class', 'btn-danger some-other-class']
            // statusOfFixed => [ true, false, false, true ]
            const statusOfFixed = Array.from(classes).map(aclass => {
              return aclass.split(' ').includes('bg-danger') ? true : false;
            });

            expect(statusOfFixed.toString()).toBe(expectedValues.toString());
            resolve();
          });
      });
    };

    // add 5 persons
    return (
      $('button')
        .click()
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => $('button').click())
        .then(() => isResultSameWith([false, false, false, false, false]))

        // when clicking person[0]'s dollar button
        .then(() =>
          $$('.container-of-person-list .dollar')
            .get(0)
            .click(),
        )
        .then(() => isResultSameWith([true, false, false, false, false]))

        // when clicking person[1]'s plus button
        .then(() =>
          $$('.btn-1')
            .get(1)
            .click(),
        )
        .then(() => isResultSameWith([true, true, false, false, false]))

        // when clicking person[2]'s minus button
        .then(() =>
          $$('.btn-2')
            .get(2)
            .click(),
        )
        .then(() => isResultSameWith([true, true, true, false, false]))

        // when person[3]'s value was changed
        .then(() =>
          $$('.list-group-item input')
            .get(3)
            .sendKeys(
              protractor.Key.chord(protractor.Key.CONTROL, 'a'),
              '1234',
            ),
        )
        .then(() => isResultSameWith([true, true, true, true, false]))

        // when clicking person[4]'s dollar button
        .then(() =>
          $$('.container-of-person-list .dollar')
            .get(3)
            .click(),
        )
        .then(() => isResultSameWith([true, true, true, false, false]))

        // finish
        .then(() => true)
    );
  }
}
