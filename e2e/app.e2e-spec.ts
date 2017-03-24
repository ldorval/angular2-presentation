import { Angular2PresentationPage } from './app.po';

describe('angular2-presentation App', () => {
  let page: Angular2PresentationPage;

  beforeEach(() => {
    page = new Angular2PresentationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
