CHANGELOG
=========

v0.2.2
------

Minor improvements

Date: upcoming

- Added `required` option to form-field sub-generator
- Minor add to angular-app admin sass

v0.2.1
------

Added form-field sub-generator, fixes and improvements

Date: Sun Sep 11, 2016

- Added form-field sub-generator for textbox, select combo box
- Improved sub-generators code: removed path module
- Fix route path name in express route append, used in model sub-generator
- Fixed angular route closing tag in append, used in component sub-generators
- Fixed angular route wrong object name format in component sub-generators for append
- Fix missing express route for contact in `app.js` template
- Comment out generated files that cannot be tested from `gulpfile.js` and `karma.conf.js` templates
- Moved gulp `doneCallback` inside mocha task to stop preventing watch in template
- Renamed angular-component-list sub-generator file `e2e-tests/_angular-app-name_.scenarios.js.ejs`
  to include object name

v0.2.0
------

Generate unit tests and improve gulp

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

- Improved `gulpfile.js` template
  - Moved all dependencies directly in `package.json` template.
  - Improved code styling

v0.1.1
------

Added angular-controller-form

Date: Tue Aug 9, 2016

- Added `angular-controller-form` sub-generator
  - Fix lint errors
  - Added contact form router and view
  - Added sub-generator

- Minor improvement in `gulpfile.js` template
- Fix minor typo in `views/login.ejs` template

v0.1.0
------

First release

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
