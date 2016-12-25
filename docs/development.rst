Development Process
===================

This page briefly describes a typical MEAN app development process.

Process
-------

- (0) Environment setup

  - Prepare OS

     - `Install node.js`_
     - :ref:`Install Mongodb`
     - :ref:`Install global packages`
     - Yeoman and makrina :doc:`installation`

  - Start project

     - Use makrina :doc:`main`: ``yo makrina``
     - `Review generated files`_
     - Review meta documents (``README, LICENSE, CONTRIBUTING, CHANGELOG``)

  - Configure packages

     - Review ``package.json``
     - Review ``gulpfile.js``
     - Start with ``npm start`` or ``node bin/www``

- (A) :ref:`Angular` and front-end

  - (0) Bootstrapping

     - Review ``views/index.ejs``
     - Review :ref:`Admin template`
     - Review and add js files in gulp

  - (1) Static template

     - Add static files
     - Style up
     - Review and add sass/css files in gulp

  - (2) Angular setup

     - Review ``public/javascripts/app`` folder
     - Review ``karma.conf.js`` for :ref:`Tests`

  - (3) Components

     - Review list component ``object-list.component.js``
     - Review list unit test ``object-list.component.spec.js``

  - (4) Module and file Organization

     - Review ``app.module.js`` and inject any additional module dependency
     - Review list template ``object-list.template.html``

  - (5) Filters

     - Add custom filters to list

  - (6) Extend e2e tests

     - Review ``protractor.conf.js``
     - Review e2e tests ``e2e-tests/app.scenarios.js``

  - (7) XHR

  - (8) Templating list

     - Expand on the list template

  - (9) Angular Routing

     - Template: review ``ng-view``
     - Dependency: using ``angular-route``. Review ``app.module.js``
     - Configure in ``app.config.js``
     - Review detail component ``object-detail/object-detail.component.js``
     - Review detail module ``object-detail.module.js`` and inject in ``app.module.js``
     - Extend e2e tests

  - (10) Templating detail

     - Expand on the detail template
     - Review ``node-detail.component.spec.js``
     - Extend e2e tests

  - (11) Core module

     - Review core module ``core/core.module.js`` and inject in ``app.module.js``
     - Add custom filters in ``core/filter_name/filter_name.filter.js`` (optional)
     - Add unit tests in ``filter_name.filter.spec.js``

  - (12) Event handlers

  - (13) REST and custom services factory

     - Dependency: using ``angular-resource``
     - Review module ``core/object/object.module.js`` with dependency to ``ngResource``
     - Review service ``object.service.js``
     - Inject ``core.object`` to ``core.module.js``, ``object-list.component.js``, ``object-detail.component.js``
     - Review unit test ``object.service.spec.js``

  - (14) Animations

     - Dependency: using ``angular-animate`` in ``app.module.js``
     - Review ``app.animations.sass``
     - Review template: jquery loaded in head, relevant classes to ``ng-view``
     - Extend animations with js

- (B) Node and back-end

  - Models: :ref:`Mongoose`

     - Review ``services/mongoose.js``
     - Review and create ``models/``
     - Review express-session in ``services/session-config.js``
     - Add :ref:`CSRF` to non-Angular forms
     - Review ``newrelic.js``.

  - Routes: Express

     - Review i18n_ urls in ``services/i18n-config.js`` and ``routes/index.js``
     - Connect Angular service to routes: review ``routes/api/``.

  - Breadcrumb

.. _Install node.js: https://github.com/Wtower/express-experiment#install-node
.. _Review generated files: https://github.com/Wtower/generator-makrina/blob/master/generators/app/templates
.. _i18n: https://github.com/mashpie/i18n-node


Environment setup
-----------------

.. _Install Mongodb:

Install Mongodb
^^^^^^^^^^^^^^^

- Latest Mongodb (at the time of writing) is v3.2.
- Ubuntu 16.04 comes with v2.6.
- Ubuntu 14.04 comes with v2.4 (see `how to upgrade Mongo`_).
- Version 2.6 will be used throughout due to availability on hosts.

.. _how to upgrade Mongo: https://www.digitalocean.com/community/questions/how-to-upgrade-mongodb-2-4-to-2-6-on-ubuntu-14-04

.. _Install global packages:

Install global packages
^^^^^^^^^^^^^^^^^^^^^^^
::

    ~/.nvm/v4.4.7/lib
    ├── gulp-cli@1.2.1
    ├── karma-cli@1.0.1
    └── npm@3.10.6

Install with::

    nvm install 4
    npm update -g npm
    npm install -g gulp-cli karma-cli

.. _Angular:

Angular
-------

The outline follows the `Angular tutorial`_.
Gulpfile is configured to concatenate the angular app.

.. _Angular tutorial: https://docs.angularjs.org/tutorial

Sanitize
^^^^^^^^

``angular-sanitize`` can be used to `present a sanitized scope variable`_ with ``ng-bind-html``.

To further sanitize HTML stored in db, the module mongoose-html_
can be used. The project is abandoned and has unmet peer dependencies so don't install it directly, the relevant
piece of code is very small and can be used directly.

It is based on sanitize-html_ which can be used at a lower level.
It is not possible to easily use it though with `custom validators`_
as they do not return the value but only a boolean, and also they are yet harder to use within objects.

.. _present a sanitized scope variable: http://stackoverflow.com/questions/25548485/angular-js-how-can-i-sanitize-html-in-a-controller/38511134#38511134
.. _mongoose-html: https://github.com/homerquan/mongoose-html
.. _sanitize-html: https://github.com/punkave/sanitize-html
.. _custom validators: http://mongoosejs.com/docs/validation.html


.. _Tests:

Tests
-----

Unit tests
^^^^^^^^^^

All unit tests can be invoked from ``npm test``, which essentially invokes ``gulp test``::

    npm test

Unit tests involve front-end tests with karma and back-end tests with mocha.
Both provide coverage report using istanbul.
If browser is not starting, export ``CHROME_BIN``.
For fish see this `fish configuration gist`_.

.. _fish configuration gist: https://gist.github.com/Wtower/970bf009f0a9c3b0733a

End-to-end tests
^^^^^^^^^^^^^^^^
::

    npm start
    npm run protractor

Server needs to have started before.
Protractor can only run in local.
Protractor is tested only for Chrome due to `#3044`_::

    npm start
    node_modules/protractor/bin/webdriver-manager update
    node_modules/protractor/bin/protractor e2e-tests/protractor.conf.js

.. _#3044: https://github.com/angular/protractor/issues/3044

Extend tests
^^^^^^^^^^^^

The generated unit tests cover 100% or nearly of the generated code. Nevertheless, the following files have been
excluded out from testing and coverage:

- The object api endpoint route ``routes/api/object.js``. It needs further development and custom test.
- The mongoose service ``services/mongoose.js``. This will get indirectly covered by the above.
- The object angular components need further development.

Consequently, after developing the above, add the relevant files in the ``gulpfile.js`` ``js_cover`` section and
``karma.conf.js`` ``files`` and ``preprocessors`` section.


.. _Admin template:

Admin template
--------------

The `Gentelella admin theme`_ is adapted into ``views/admin.ejs``.
The adaptations include:

- Most static files are loaded from minified output from gulpfile.
- Context is provided from ``routes/admin.js``.
- The main view is adopted for Angular route using ``ng-view``.
- Also, a ``views/login.ejs`` template has been added.

Lastly, the ng-gentelella_ package is used.

.. _Gentelella admin theme: https://github.com/puikinsh/gentelella
.. _ng-gentelella: https://github.com/Wtower/ng-gentelella


.. _Mongoose:

Mongoose
--------

The files ``servives/mongoose.js`` and ``models/object.js`` need to be reviewed.

Models are used in routes by requiring::

    var mongoose = require('mongoose');
    var Object = mongoose.model('Object');

Mongoose quick reference
^^^^^^^^^^^^^^^^^^^^^^^^

- `Mongoose Quickstart`_
- `Mongoose Guide`_
- `Schema definition and types`_
- `Updating nested objects`_
- `Field update operators`_

.. _Mongoose Quickstart: http://mongoosejs.com/docs/index.html
.. _Mongoose Guide: http://mongoosejs.com/docs/guide.html
.. _Schema definition and types: http://mongoosejs.com/docs/schematypes.html
.. _Updating nested objects: http://stackoverflow.com/questions/23832921/updating-nested-object-in-mongoose
.. _Field update operators: https://docs.mongodb.com/manual/reference/operator/update-field/

Sanitize and injection
^^^^^^^^^^^^^^^^^^^^^^

`Mongodb injection`_ is very much possible
with mongo queries, especially when a where criterion is provided from a public form or url.
The module mongo-sanitize_ can be easily used to sanitize
``req.body`` and ``req.query`` from mongo ``$`` operators.

.. _Mongodb injection: http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
.. _mongo-sanitize: https://www.npmjs.com/package/mongo-sanitize


.. _CSRF:

CSRF
----

CSRF protection is ensured by the Csurf package.
Angular forms respect CSRF due to the ``XSRF-TOKEN`` cookie that we make in ``app.js``.
All other forms require manual append of CSRF:

- In router context: ``context.csrf = req.csrfToken();``
- In forms: ``<input type="hidden" name="_csrf" value="<%= csrf %>">``

The responses are automatically checked by the module and 403 is returned appropriately.
This is tested in mocha too.


Useful links
------------

Generic MEAN REST tutorials
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- https://thinkster.io/mean-stack-tutorial
- http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
- https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

Testing
^^^^^^^

- http://developers.redhat.com/blog/2016/03/15/test-driven-development-for-building-apis-in-node-js-and-express/
- https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/


Updates
-------

Most generated code gets signed by the Makrina version and date in a comment at the top of file.
All changes are documented in ``CHANGELOG.md``. Any change that may affect existing generated files
is marked with a warning sign. Usually changes in existing files that may have been generated
in existing projects exist in minor releases (version numbering: major, minor, revision).

If you feel like using a latest feature or change,
you can manually update the relevant files, and append the Makrina version in the comment for
future reference::

    * Updated to yeoman generator-makrina <%= version %> on <%= date %>.

Or re-run the generator by carefully selecting which files to replace when asked.
