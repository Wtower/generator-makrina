CHANGELOG
=========

v0.1.2
------

Date: Wed Aug 17, 2016

- Added development cycle to documentation
- Added this changelog

- Added unit tests
  - Updated dependencies in `package.json` template
  - Updated `gulpfile.js` template to facilitate tests
  - Added ES lint, NSP, Mocha, Chai, Istanbul
  - Update `app.js` template to ignore error handler coverage
  - Update `gitignore` template to ignore coverage output
  - Added `spec/` folder in app templates with all mocha tests
  - Index, admin and contact form with stub transport are all covered
  - Updated `karma.conf.js` template to use istanbul
  - Added Gitlab CI conf file 

v0.1.1
------

Date: Tue Aug 9, 2016

- Added `angular-controller-form` sub-generator
  - Fix lint errors
  - Added contact form router and view
  - Added sub-generator

- Minor improvement in `gulpfile.js` template
- Fix minor typo in `views/login.ejs` template

v0.1.0
------

Date: Fri Jul 29, 2016

- Coverage
  - Added coveralls to gulpfile
  - Added coveralls support
  - Removed legacy node.js versions from travis
  - Added coveralls badge

- First generator release
  - Updated dependencies and documentation.
  - Finalized tests
  - Fixed all lint errors
  - Fix several minor issues
  - Added e2e-tests

- Generators
  - Added model sub-generator
  - Refactor file editing into service
  - Added angular component detail sub-generator
  - Added angular component list sub-generator
  - Added generator version info in templates
  - Added angular core service sub-generator to compose
  - Added in-line editing of existing files
  - Improved angular core service sub-generator to extend main app prompts and services
  - Added composeWith to main generator with passing variables as options
  - Added angular-app sub-generator
  - Added public stylesheet and main js
  - Added admin route and views
  - Added e2e tests services, routes, views
  - Added root files in main app generator
  - Added documentation
  - Added angular-core-service sub-generator