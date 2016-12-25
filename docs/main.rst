Main app generator
==================

Build the MEAN project scaffolding.

Execute
-------

The main generator is invoked using::

  yo makrina

Description
-----------

The generator creates a new project featuring:

- A default ``package.json`` file with the appropriate description and dependencies for the following.
- Default meta documents: ``README``, private ``LICENCE``, ``CONTRIBUTING``, ``CHANGELOG``.
- Default ``gitignore`` and ``editorconfig`` files
- Standard express.js boilerplate: ``app.js``, ``bin/``, ``public/``, ``routes/``, ``views/``.
- A default ``gulpfile`` mainly for managing front-end files.
- Standard karma and protractor (e2e) configuration.
- A ``services`` folder with most configuration scripts: mongoose, session, i18n, email.
- Default routes & views for index, admin interface and contact form.
- A ``.yo-rc.json`` local yeoman configuration file with the options used to generate the project.

It then calls the following sub-generators for an angular application with basic REST CRUD functionality
for a single object. Repeat calling the sub-generators on their own to add more objects.

Sub-generators
--------------

The main generator also invokes the following sub-generators by order:

- :doc:`angular-app`
- :doc:`angular-core-service`
- :doc:`angular-component-list`
- :doc:`angular-component-detail`
- :doc:`model`

Prompts
-------

The generator asks the following input:

- **Project name**: the generated project name (no spaces).
  Used in: ``package.json, README.md, newrelic.js, services/mongoose.js``.

- **Verbose name**: a verbose project name, spaces allowed.
  Used in: ``newrelic.js, routes/index.js, routes/admin.js, routes/api/contact.js``.

- **Description**: project description.
  Used in: ``package.json, README.md, routes/index.js, views/index.ejs``.

- **Git repository URL**. Used in ``package.json``.

- **Author**. Used in ``package.json, LICENSE, CONTRIBUTING.md, views/index.ejs``.

- **Organization**: Organization name for author.
  Used in: ``views/index.ejs, views/login.ejs, views/admin.ejs``.

- **Organization URL**. Used in ``views/login.ejs, views/admin.ejs``.

- **Deploy host**: optional for ``npm deploy`` command.
  Used in: ``package.json``.

- **New Relic license key**. Used in ``newrelic.js``.

There are also additional prompts from the sub-generators.
