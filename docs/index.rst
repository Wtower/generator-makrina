.. generator-makrina documentation master file, created by
   sphinx-quickstart on Sat Dec 24 18:44:06 2016.

generator-makrina documentation
===============================

Generate MEAN boilerplate. Featuring model and route CRUD endpoint sub-generators and an admin interface.

Makrina generates a starting project with the following stack and features.

Technology Stack
----------------

- Mongo DB
- Express.js
- Angular JS
- Node.js

Features
--------

- `EJS templates`_
- An admin interface based on Gentelella :ref:`Admin template`
- Latest :ref:`Angular` v1.6 scaffolding created by sub-generators
- :Ref:`Mongoose` models created by sub-generators
- API route endpoints for the models
- An extended gulpfile for building and testing
- Ready for :ref:`Tests` using mocha, chai, sinon, karma, protractor.
- Generated code should have already 100% coverage or nearly.
- :ref:`CSRF` protection.

.. _EJS templates: https://github.com/tj/ejs

.. toctree::
   :maxdepth: 1
   :caption: Contents

   installation
   main
   angular-app
   angular-core-service
   angular-component-list
   angular-component-detail
   angular-controller-form
   model
   development
