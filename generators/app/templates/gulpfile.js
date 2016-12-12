/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 *
 * Gulp configuration
 * Adapted from gulpfile-ninecms
 *
 * gulp (watch) : for development
 * gulp build : for a one off development build
 * gulp build --production : for a minified production build
 */

/*
 * Configuration
 */
var paths = {
  assets: [
    // 'node_modules/bootstrap/dist/*fonts/*',
  ],
  sass: [
    'public/stylesheets/*.s?ss'
  ],
  less: [],
  css: [
    'node_modules/bootstrap/dist/css/bootstrap*(|-theme).css',
    'public/build/css/<%= name %>.css' // sass build
  ],
  js: '',
  js_watch: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'private/javascripts/*.js'
    // angular
    // 'node_modules/angular/angular.js',
    // 'node_modules/angular-animate/angular-animate.js',
    // 'public/javascripts/<%= name %>/*.module.js',
    // 'public/javascripts/<%= name %>/*.module.js',
    // 'public/javascripts/<%= name %>/**/*.controller.js'
  ],
  js_lint: [
    'bin/*.js',
    'e2e-tests/*.js',
    'models/*.js',
    'private/javascripts/*.js',
    'public/javascripts/admin/*.js',
    'routes/**/*.js',
    'services/*.js',
    'spec/**/*.js',
    '*.js'
  ],
  js_cover: [
    'models/*.js',
    'routes/*.js',
    // 'routes/**/*.js',
    'routes/api/contact.js',
    // 'services/*.js',
    'services/email.js',
    'services/i18n-config.js',
    'services/session-config.js',
    'app.js'
  ],
  mocha: [
    'spec/*.js',
    // 'spec/api/contact.js',  // disable to prevent send e-mail
    'spec/api/contact.stub.js'
  ],
  build: 'public/build/',
  images: '',

  admin: {
    assets: [
      'node_modules/bootstrap/dist/*fonts/*',
      'node_modules/font-awesome/*fonts/*'
    ],
    sass: [
      'public/javascripts/admin/**/*.s?ss',
      'node_modules/ng-gentelella/gentelella/*.s?ss'
    ],
    css: [
      'node_modules/gentelella/vendors/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      'node_modules/gentelella/vendors/nprogress/nprogress.css',
      'node_modules/gentelella/vendors/iCheck/skins/flat/green.css',
      'node_modules/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.buttons.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.nonblock.css',
      'node_modules/gentelella/vendors/select2/dist/css/select2.min.css',
      'public/build/admin/css/admin.*.css',
      'public/build/admin/css/gentelella.*.css'
    ],
    js_watch: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.js',
      'node_modules/gentelella/vendors/fastclick/lib/fastclick.js',
      'node_modules/gentelella/vendors/nprogress/nprogress.js',
      'node_modules/gentelella/vendors/Chart.js/dist/Chart.min.js',
      'node_modules/gentelella/vendors/gauge.js/dist/gauge.min.js',
      'node_modules/gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js',
      'node_modules/gentelella/vendors/iCheck/icheck.min.js',
      'node_modules/gentelella/vendors/skycons/skycons.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.pie.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.time.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.stack.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.resize.js',
      'node_modules/gentelella/production/js/flot/jquery.flot.orderBars.js',
      'node_modules/gentelella/production/js/flot/date.js',
      'node_modules/gentelella/production/js/flot/jquery.flot.spline.js',
      'node_modules/gentelella/production/js/flot/curvedLines.js',
      'node_modules/gentelella/production/js/moment/moment.min.js',
      'node_modules/gentelella/production/js/datepicker/daterangepicker.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.buttons.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.nonblock.js',
      'node_modules/gentelella/vendors/select2/dist/js/select2.full.js',

      'node_modules/ng-gentelella/gentelella/*.module.js',
      'node_modules/ng-gentelella/gentelella/*.config.js',
      'node_modules/ng-gentelella/gentelella/**/*.module.js',
      'node_modules/ng-gentelella/gentelella/**/*.component.js',
      'node_modules/ng-gentelella/gentelella/**/*.service.js',

      'public/javascripts/admin/*.module.js',
      'public/javascripts/admin/*.config.js',
      'public/javascripts/admin/core/*.module.js',
      'public/javascripts/admin/core/*.filter.js',
      'public/javascripts/admin/core/**/*.module.js',
      'public/javascripts/admin/core/**/*.service.js',
      'public/javascripts/admin/dashboard*/*.module.js',
      'public/javascripts/admin/dashboard*/*.component.js',
      'public/javascripts/admin/*list/*.module.js',
      'public/javascripts/admin/*list/*.component.js',
      'public/javascripts/admin/*detail/*.module.js',
      'public/javascripts/admin/*detail/*.component.js',
      'public/javascripts/admin/*detail/*.filter.js'
    ],
    build: 'public/build/admin/'
  }
};
var config = {
  autoprefixer_versions: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
};
var images = [];

/*
 * Include section
 */
'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var argv = require('yargs').argv;
// css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// sass/less
var less = require('gulp-less');
var sass = require('gulp-sass');
// js
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
// linting
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
// image optimization
var imageResize = require('gulp-image-resize');
var es = require('event-stream');
var rename = require('gulp-rename');
var parallel = require('concurrent-transform');
var os = require('os');
var changed = require('gulp-changed');
// google fonts
var googleWebFonts = require('gulp-google-webfonts');
// testing/mocha
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var karmaServer = require('karma').Server;
var path = require('path');
var fs = require('fs');

/*
 * Prepare
 */
// gulp build --production
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : false;
var watch = argv._.length ? argv._[0] === 'watch' : true;

/*
 * Error notification methods
 */
var handleError = function (task) {
  return function (err) {
    notify.onError({
      message: task + ' failed, check the logs',
      sound: false
    })(err);
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

/**
 * CUSTOM TASK METHODS
 */
var tasks = {
  /*
   * Delete build folder
   */
  clean: function () {
    return del([paths.build]);
  },

  /*
   * Copy static assets
   */
  assets: function () {
    return gulp.src(paths.assets)
      .on('error', handleError('Assets'))
      .pipe(gulp.dest(paths.build));
  },

  /*
   * CSS
   */
  css: function () {
    return gulp.src(paths.css)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('CSS'))
      .pipe(concat('style.min.css'))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * LESS
   */
  less: function () {
    return gulp.src(paths.less)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('LESS'))
      .pipe(less())
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * SASS
   */
  sass: function () {
    return gulp.src(paths.sass)
    // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      .pipe(gulpif(!production, sourcemaps.init({'loadMaps': true})))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      // we don't serve the source files so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({'includeContent': true}))
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * Browserify
   */
  browserify: function () {
    var bundler = browserify(paths.js, {
      debug: !production,
      cache: {}
    });
    if (watch) {
      bundler = watchify(bundler);
    }
    var rebundle = function () {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('build.js'))
        .pipe(gulpif(production, buffer()))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(paths.build + 'js/'));
    };
    bundler.on('update', rebundle);
    return rebundle();
  },

  /*
   * linting
   */
  lintjs: function () {
    return gulp.src(paths.js_lint)
      .pipe(excludeGitignore())
      .pipe(eslint({
        rules: {
          // control characters eg `\n` are required for file appends
          'no-control-regex': 'off',
          // allow double quotes to avoid escaping single
          'quotes': ['error', 'single', {avoidEscape: true}],
          // relax curly
          'curly': ['error', 'multi-line']
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .on('error', handleError('LINT'));
  },

  /*
   * Concatenate js
   */
  concatJs: function () {
    return gulp.src(paths.js_watch)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('JS'))
      .pipe(concat('index.min.js'))
      .pipe(gulpif(production, uglify({preserveComments: 'license', mangle: false})))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'js/'));
  },

  /*
   * Optimize asset images
   */
  images: function () {
    var streams = [];
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      img['imageMagick'] = true; // better quality
      streams.push(gulp.src(img.src, {base: paths.images})
        .pipe(parallel(
          imageResize(img),
          os.cpus().length
        ))
        // http://stackoverflow.com/questions/16724620/mutable-variable-is-accessible-from-closure-how-can-i-fix-this
        .pipe(rename((function (img_path) {
          return function (path) {
            path.dirname += img_path;
          }
        })(img.build))));
    }
    return es.merge(streams)
      .pipe(gulp.dest(paths.images));
  },

  /*
   * Delete optimized image styles
   * ATTENTION: make sure the path form pagetype/field/style/img is used
   */
  clean_image_opts: function () {
    return del([paths.images + '/*/image/*/*']);
  },

  /*
   * Google web fonts
   */
  fonts: function () {
    return gulp.src('./fonts.list')
      .pipe(googleWebFonts())
      .pipe(gulp.dest(paths.build + 'fonts/'));
  },

  /*
   * Testing security exploits with NSP
   */
  nsp: function (cb) {
    nsp({package: path.resolve('package.json')}, cb);
  },

  /*
   * Pre-Testing
   */
  preTest: function () {
    return gulp.src(paths.js_cover)
      .pipe(excludeGitignore())
      .pipe(istanbul({
        includeUntested: true
      }))
      .pipe(istanbul.hookRequire());
  },

  /*
   * Testing with mocha
   * https://github.com/sindresorhus/gulp-mocha/issues/54#issuecomment-240666300
   */
  mocha: function () {
    gulp.doneCallback = function (err) {
      process.exit(err ? 1 : 0);
    };
    return gulp.src(paths.mocha)
      .pipe(plumber())
      .pipe(mocha({reporter: 'spec', colors: true}))
      .on('error', handleError('Mocha'))
      .pipe(istanbul.writeReports());
  },

  /*
   * Testing with karma
   */
  karma: function (done) {
    new karmaServer({
      configFile: path.join(__dirname, '/karma.conf.js'),
      singleRun: true
    }, function () {
      done();
    }).start();
  },

  /**
   * ADMIN
   */

  /*
   * Copy static assets
   */
  adminAssets: function () {
    return gulp.src(paths.admin.assets)
      .on('error', handleError('Assets'))
      .pipe(gulp.dest(paths.admin.build));
  },

  /*
   * CSS
   */
  adminCss: function () {
    return gulp.src(paths.admin.css)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('CSS'))
      .pipe(concat('style.min.css'))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.admin.build + 'css/'));
  },

  /*
   * SASS
   */
  adminSass: function () {
    return gulp.src(paths.admin.sass)
    // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      .pipe(gulpif(!production, sourcemaps.init({'loadMaps': true})))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      // we don't serve the source files so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({'includeContent': true}))
      .pipe(gulp.dest(paths.admin.build + 'css/'));
  },

  /*
   * Concatenate js
   */
  adminConcatJs: function () {
    // paths.admin.js_watch.forEach(fs.statSync);
    return gulp.src(paths.admin.js_watch)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('JS'))
      .pipe(concat('index.min.js'))
      .pipe(gulpif(production, uglify({preserveComments: 'license', mangle: false})))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.admin.build + 'js/'));
  }
};

/*
 * CUSTOMS TASKS
 */
gulp.task('clean', tasks.clean);
// for production we require the clean method on every individual task
var req = build ? ['clean'] : [];
// individual tasks
gulp.task('assets', req, tasks.assets);
gulp.task('css', req.concat(['less', 'sass']), tasks.css);
gulp.task('less', req, tasks.less);
gulp.task('sass', req, tasks.sass);
gulp.task('browserify', req, tasks.browserify);
gulp.task('lintjs', tasks.lintjs);
gulp.task('concatJs', req, tasks.concatJs);
gulp.task('images', req, tasks.images);
gulp.task('clean_image_opts', req, tasks.clean_image_opts);
gulp.task('fonts', req, tasks.fonts);
gulp.task('nsp', tasks.nsp);
gulp.task('preTest', tasks.preTest);
gulp.task('mocha', tasks.mocha);
gulp.task('karma', tasks.karma);
gulp.task('istanbul', ['preTest'], tasks.mocha);
gulp.task('adminAssets', req, tasks.adminAssets);
gulp.task('adminSass', req, tasks.adminSass);
gulp.task('adminCss', req.concat(['adminSass']), tasks.adminCss);
gulp.task('adminConcatJs', req, tasks.adminConcatJs);

// build task
gulp.task('build', [
  'assets',
  'less',
  'sass',
  'css',
  // 'browserify',
  'concatJs',
  'images',
  'fonts',
  'adminAssets',
  'adminSass',
  'adminCss',
  'adminConcatJs'
]);

// test task
gulp.task('test', [
  'lintjs',
  'nsp',
  'istanbul',
  'karma'
]);

/*
 * DEV/WATCH TASK
 */
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.less, ['less', 'css']);
  gulp.watch(paths.sass, ['sass', 'css']);
  gulp.watch(paths.js_watch, ['concatJs']);
  gulp.watch(paths.admin.css, ['adminCss']);
  gulp.watch(paths.admin.sass, ['adminSass', 'adminCss']);
  gulp.watch(paths.admin.js_watch, ['adminConcatJs']);
  gulp.watch(['./fonts.list'], ['fonts']);
  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['watch']);
