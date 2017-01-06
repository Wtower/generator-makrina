CHANGELOG
=========

v0.5.3
------

Date: Fri 6 Jan, 2017

- Utilize gulpfile-ninecms in generated gulpfile #29
- Check if config.js exists before attempting to modify in angular sub-generators

v0.5.2
------

Fix #30: Error during generation with angular path

Date: Mon 2 Jan, 2017

v0.5.1
------

Added full documentation, configuration store and new path option 

Date: Mon Dec 26, 2016

- Moved documentation to read-the-docs
- Storing configuration to file #3
- Refactored prompts
- Added angular app path option #26

v0.5.0
------

Improved generated gulpfile

Date: Wed Dec 14, 2016

- Added html2js build for angular templates in generated gulp
- Updated dependencies including ng-gentelella v2.0
- Removed admin jquery code and use ng-gentelella code

v0.4.2
------

Improvements in prompt values and password

Date: Tue Dec 13, 2016

- Updated generated dependencies
- Improved default prompt git value
- Improved default prompt project name values
- Replaced randomstring with xkcd-pass-plus for password generation
- Added ng-gentelella sass files in generated gulpfile.js
- Remove test files from coverage in generated gulpfile.js

v0.4.1
------

Added dashboard counter, minor improvements

Date: Wed Nov 23, 2016

- Updated node-uuid to uuid
- Fixed minor typos in generated angular detail and list component
- Added limit to generated angular lists
- Added opengraph tags in generated index
- Add fade animation for ng-show
- Fix cache invalidate version token in generated index and admin ejs
- Added ga-dashboard-counter in generated dashboard
- Minor fix in generated admin.ejs

v0.4.0
------

Now using ng-gentelella and several improvements

Date: Fri Nov 11, 2016

- Fix #17: Generate dashboard
- Fix #16: Add image resize feature
- Fix #15: Fix set session before redirecting in admin login
- Fix #14: Add uploads API
- Fix #13: Invalidate caches for generated gulp built files
- Fix #6: Remove form-field sub-generator and use ng-gentelella
- Wire up REST delete action
- Fix minor error in generated gulpfile
- Fixed minor errors in generated detail component js
- Updated package dependencies
- Minor fixes

v0.3.0
------

Improved component detail sub-generator; additional form fields for admin interface; bug fixes

Date: Mon Sep 19, 2016

- Fix #7: error on project generation
- :warning: Added submit button and handler for component detail
- Minor fix in form name of component detail template
- Added select fields to form-field sub-generator
- :warning: Modified generated `gulpfile.js` to include admin form field scripts
- :warning: Modified generated `admin.jquery.js` to initialize form field scripts
- :warning: Modified generated `object-detail.component.js` to re-init form field scripts after angular template load
- Added checkbox field to form-field sub-generator
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

- :warning: Improved `gulpfile.js` template
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
