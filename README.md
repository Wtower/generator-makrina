generator-makrina 
=================

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Generate MEAN boilerplate

Installation
------------

First, install [Yeoman](http://yeoman.io) and generator-makrina using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

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

- `angular-app`: Generate an Angular application.
- `angular-core-service`: Generate a `core.object` module containing an `ngResource` factory.
- `angular-component-list`: Generate a component for displaying a list.
- `angular-component-detail`: Generate a component for displaying an object.
- `model`: Generate a mongoose model with api endpoint for express.

Prompts
-------

The generator asks the following.

### General

- Project name: the generated project name (no spaces).
  Used in: `package.json, README.md, newrelic.js, services/mongoose.js`.
  
- Verbose name: a verbose project name, spaces allowed.
  Used in: `newrelic.js, routes/index.js, routes/admin.js`.

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
