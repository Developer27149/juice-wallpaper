import {
  addNewWallpaper,
  getGreeting,
  getWallpaperList,
} from '../support/app.po';

describe('juice-wallpaper-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Welcome/);
  });

  it('should have 1 wallpaper li', () => {
    getWallpaperList().should((t) => expect(t.length).equal(1));
  });

  it('should add new wallpaper', () => {
    addNewWallpaper().click();
    getWallpaperList().should((t) => expect(t.length).equal(2));
  });
});
