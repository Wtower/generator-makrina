generator-makrina 
=================

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/github/Wtower/generator-makrina/badge.svg?branch=master)](https://coveralls.io/github/Wtower/generator-makrina?branch=master) [![Dependency Status][daviddm-image]][daviddm-url]

Generate MEAN boilerplate

Installation
------------

First, install [Yeoman](http://yeoman.io) and generator-makrina using [npm](https://www.npmjs.com/) 
(we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-makrina
```

Then generate your new project:

```bash
yo makrina
```

Sub-generators
--------------

Called by app generator:

- `angular-app`: Generate an Angular application.
- `angular-core-service`: Generate a `core.object` module containing an `ngResource` factory.
- `angular-component-list`: Generate a component for displaying a list.
- `angular-component-detail`: Generate a component for displaying an object.
- `model`: Generate a mongoose model with api endpoint for express.

Not called by app generator: 

- `angular-controller-form`: Generate a simple module with a controller to handle a form submit.

How to use:

```bash
yo makrina:angular-app
```

Description
-----------

The generator creates a new project featuring:

### Main app generator

- A default `package.json` file with the appropriate description and dependencies for the following.
- Default meta documents: `README`, private `LICENCE`, `CONTRIBUTING`, `CHANGELOG`.
- Default `gitignore` and `editorconfig` files
- Standard express.js boilerplate: `app.js`, `bin/`, `public/`, `routes/`, `views/`.
- A default `gulpfile` mainly for managing front-end files.
- Standard karma and protractor (e2e) configuration.
- A `services` folder with most configuration scripts: mongoose, session, i18n, email.
- Default routes & views for index, admin interface and contact form.

It then calls the following sub-generators for an angular application with basic REST CRUD functionality 
for a single object. Repeat calling the sub-generators on their own to add more objects.

### Angular app sub-generator

This is called by app generator or stand-alone. It creates a standard Angular 1.5.8 scaffolding:

- A main app module
- An angular config file 
- An additional jquery file with app-related jquery functions
- An additional SASS file with app-related styling
- An animations SASS file with ng-animate styling
- An additional core sub-module for facilitating common core functions (factories, filters) in the future.

Usually this intended for an admin app with basic CRUD functionality using the sub-generators below.

### Angular core service

This is called after the angular app sub-generator (or stand-alone). It creates:

- An additional core sub-module to facilitate an object factory service (REST communication with server).
- The actual service file
- A unit tests file

### Angular list component

This is called after the angular core service (or stand-alone). It creates:

- An additional sub-module to display an object list based on the above service.
- A default angular 1.5.4 component for the list
- The angular template for the list
- A unit tests file
- An e2e scenarios file

### Angular detail component

This is called after the angular list component (or stand-alone). It creates:

- An additional sub-module to display an object form.
- A default angular 1.5.4 component to allow get, post, delete
- The angular template for the form
- A unit tests file
- An e2e scenatios file

### Angular form controller

A small controller to post a form such as a contact message and handle the form submit button status.
Not called by main app generator.

Prompts
-------

The generator asks the following.

### General

- Project name: the generated project name (no spaces).
  Used in: `package.json, README.md, newrelic.js, services/mongoose.js`.
  
- Verbose name: a verbose project name, spaces allowed.
  Used in: `newrelic.js, routes/index.js, routes/admin.js, routes/api/contact.js`.

- Description: project description.
  Used in: `package.json, README.md, routes/index.js, views/index.ejs`.

- Git repository URL. Used in `package.json`.

- Author. Used in `package.json, LICENSE, CONTRIBUTING.md, views/index.ejs`.

- Organization: Organization name for author.
  Used in: `views/index.ejs, views/login.ejs, views/admin.ejs`.

- Organization URL. Used in `views/login.ejs, views/admin.ejs`.

- Deploy host: optional for `npm deploy` command.
  Used in: `package.json`.

- New Relic license key. Used in `newrelic.js`.


### Angular app

- Angular app short name: the short name for the app, eg. `admin` or `app`.
  Used in: destination prefix for the files of the sub-generators: 
  angular-app, angular-core-service, angular-component-list, angular-component-detail.

- Angular app name: the full name for the app, eg `myProjectAdminApp`.
  Used in: `_angular-app-name_.module.js, views/admin.ejs`.


### Object

The object is usually a single entity, such as `node`, `page`, etc.
It has its own mongoose model, api endpoint and angular service and component.

- Object name (recommended camelCase).
- Object title (recommended PascalCase).
- Object API URL and directory name (recommended kebab-case).


License
-------

MIT © [Wtower](https://github.com/Wtower)


[npm-image]: https://badge.fury.io/js/generator-makrina.svg
[npm-url]: https://npmjs.org/package/generator-makrina
[travis-image]: https://travis-ci.org/Wtower/generator-makrina.svg?branch=master
[travis-url]: https://travis-ci.org/Wtower/generator-makrina
[daviddm-image]: https://david-dm.org/Wtower/generator-makrina.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Wtower/generator-makrina
