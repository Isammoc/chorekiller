import { ChorekillerPage } from './app.po';

describe('chorekiller App', () => {
  let page: ChorekillerPage;

  beforeEach(() => {
    page = new ChorekillerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
