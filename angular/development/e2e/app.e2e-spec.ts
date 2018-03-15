import { DevelopmentPage } from './app.po';

describe('development App', () => {
  let page: DevelopmentPage;

  beforeEach(() => {
    page = new DevelopmentPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
