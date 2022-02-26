import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display auth message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to doodfy-new!');
  });
});
