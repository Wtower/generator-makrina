Angular detail component sub-generator
======================================

Generate an Angular component for presenting detail data.

Execute
-------

The sub-generator is invoked with::

  yo makrina:angular-component-detail

The sub-generator is also invoked by the main_ generator.

.. _main: main.html

Description
-----------

It creates:

- An additional sub-module to display an object form.
- A default angular 1.5.4 component to allow get, post, delete
- The angular template for the form
- A unit tests file
- An e2e scenarios file

Prompts
-------

The generator asks the following input:

Angular app
^^^^^^^^^^^

The `angular app`_ prompts that have been used in the respective generator.

.. _angular app: angular-app.html

Object
^^^^^^

The `angular core service`_ prompts that have been used in the respective generator.

.. _angular core service: angular-core-service.html
