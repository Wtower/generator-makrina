Angular app sub-generator
=========================

Generate an Angular application.

Execute
-------

The sub-generator is invoked with::

  yo makrina:angular-app

The sub-generator is also invoked by the main_ generator.

.. _main: main.html

Description
-----------

It creates a standard Angular scaffolding:

- A main app module
- An angular config file
- An additional jquery file with app-related jquery functions
- An additional SASS file with app-related styling
- An animations SASS file with ng-animate styling
- An additional core sub-module for facilitating common core functions (factories, filters) in the future.

Usually this intended to allow building additional functionality with components, services etc. that can be
also built using the other angular sub-generators.

Prompts
-------

The generator asks the following input:

- **Angular app short name**: the short name for the app, eg. ``admin`` or ``app``.
  Used in: destination prefix for the files.

- **Angular app name**: the full name for the app, eg ``myProjectAdminApp``.
  Used in: ``_angular-app-name_.module.js, views/admin.ejs``.
