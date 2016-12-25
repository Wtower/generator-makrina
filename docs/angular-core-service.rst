Angular core service sub-generator
==================================

Generate an Angular service module using ``$resource``.

Execute
-------

The sub-generator is invoked with::

  yo makrina:angular-core-service

The sub-generator is also invoked by the main_ generator.

.. _main: main.html

Description
-----------

It creates:

- An additional core sub-module to facilitate an object factory service (REST communication with server).
- The actual service file
- A unit tests file

Prompts
-------

The generator asks the following input:

Angular app
^^^^^^^^^^^

The `angular app`_ prompts that have been used in the respective generator.

.. _angular app: angular-app.html

Object
^^^^^^

The object is usually a single entity, such as `node`, `page`, etc.
It has its own mongoose model, api endpoint and angular service and component.

- Object name (recommended camelCase).
- Object title (recommended PascalCase).
- Object API URL and directory name (recommended kebab-case).
