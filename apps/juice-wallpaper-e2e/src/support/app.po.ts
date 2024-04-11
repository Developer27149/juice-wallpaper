export const getGreeting = () => cy.get('h1');

export const getWallpaperList = () => cy.get('.wallpaper-list li');

export const addNewWallpaper = () => cy.get('button.get-wallpaper');
