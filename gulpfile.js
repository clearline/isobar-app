var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var autoprefixer = require('autoprefixer-core');

var APP_SRC = './src/client/index.js';
var DEST_PATH = './static/js';
var DEPS_LIST = [
  'bluebird',
  'classnames',
  'debug',
  'immutable',
  'keymirror',
  'lodash',
  'marty',
  'react',
  'react-bootstrap',
  'react-router',
  'react-router-bootstrap'
];

var logTime = function(fileName) {
  var name = $.util.colors.cyan(fileName);
  return function(ms) {
    var time = ms < 1000 ? ms + ' ms' : ms / 1000 + ' s';
    $.util.log('Browserified ' +  name + ' in ' + $.util.colors.magenta(time));
  };
};

var writeBundle = function(b, fileName) {
  return b.bundle()
  .on('error', function(err){
    $.util.log($.util.colors.red('Error'), err.message);
    this.emit('end');
  })
  .pipe(source(fileName))
  .pipe(gulp.dest(DEST_PATH));
};

var watchBundle = function(b, fileName) {
  var w = watchify(b).on('time', logTime(fileName));
  var bundle = function() {
    return writeBundle(w, fileName);
  };
  w.on('update', bundle);
  return bundle();
};

var appBundle = browserify(APP_SRC, watchify.args)
  .transform(babelify, {
    optional: [
      'es7.classProperties',
      'es7.decorators',
      'es7.objectRestSpread'
    ]
  });

var depsBundle = browserify();

DEPS_LIST.forEach(function(dep) {
  appBundle.external(dep);
  depsBundle.require(dep);
});

gulp.task('compile:style', function() {
  return gulp.src('./style/main.scss')
  .pipe($.sass())
  .on('error', function(err){
    $.util.log($.util.colors.red('Error'), err.message);
  })
  .pipe($.postcss([
    autoprefixer({browsers: ['last 2 version']})
  ]))
  .on('error', function(err){
    $.util.log($.util.colors.red('Error'), err.message);
  })
  .pipe(gulp.dest('./static/css'));
});

gulp.task('watch:style', ['compile:style'], function() {
  gulp.watch('./style/**.scss', ['compile:style']);
});

gulp.task('compile:app', function() {
  return writeBundle(appBundle, 'app.js');
});

gulp.task('compile:deps', function() {
  return writeBundle(depsBundle, 'deps.js');
});

gulp.task('watch:app', function() {
  return watchBundle(appBundle, 'app.js');
});

gulp.task('copy:fonts', function() {
  return gulp.src('./node_modules/bootstrap-sass/assets/fonts/**')
  .pipe(gulp.dest('./static/fonts'));
});

gulp.task('server', function() {
  $.nodemon({
    env: {
      DEBUG: '* -babel -send'
    },
    script: 'index.js',
    watch: 'src'
  });
});

gulp.task('compile', ['compile:deps', 'compile:app', 'compile:style', 'copy:fonts']);

gulp.task('default', ['compile:deps', 'watch:app', 'watch:style', 'copy:fonts', 'server']);
