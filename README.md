# My Office - Angular 9 application

An Angular 9 client side demo application.

Includes following modules:

- **Authentication module:** User signup and login, module guards and interceptor service.

- **News module:** Uses Bing Search API to show last news with an ability to open an article
in a new window, send it to Facebook and Twitter.

- **Contacts module:** Uses Random User API data to present contacts cards list and gives user
 an ability to save a contact to his personal contact list.

- **Blog module:** User posts presented in a list that can be sorted and filtered. User can
write posts, edit and delete them.

- **Tasks module:** User task list and task categories list. User can add, edit and remove tasks 
and categories.

- **Styling module:** User can choose light or dark styles that will change all 
application content.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

# Features

- Redux state management

- Angular Material components

- REST API data sources management

- Authentication module includes guards and interceptor service

- PWA application with service worker

- Dynamic styles


## Installation notes

Please add to `src/` folder new folder named `environments` with two files: 
`environment.prod.ts` and `environent.ts` for a production and development purposes.
These files will contain the following contetnts
`
export const environment = {
  production: false, // -for development and <true> for production
  firebaseAPIKey: YOUR KEY,
  bingNewsApiKey: YOUR KEY
};
`  
Please obtain these keys by subscribing to these services:
- `https://firebase.google.com/` - Firebase services
- `https://docs.microsoft.com/en-us/azure/cognitive-services/bing-news-search/quickstarts/client-libraries?pivots=programming-language-javascript` - for Bing Web Search Service


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
