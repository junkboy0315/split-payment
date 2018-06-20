import { AppPage } from './app.po';

describe('SplitBills App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display start page', () => {
    page.navigateTo();
    page.canDisplayStartPage();
  });

  it('should add person', () => {
    page.navigateTo();
    page.canAddPerson();
  });

  it('should calculate correctly', () => {
    page.navigateTo();
    page.canCalculateCorrectly();
  });

  it('should fix correctly', () => {
    page.navigateTo();
    page.canFixCorrectly();
  });

  it('reset values', () => {
    page.navigateTo();
    page.canResetEverything();
  });
});
