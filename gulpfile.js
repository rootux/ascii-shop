const gulp          = require('gulp');
const notify        = require('gulp-notify');
const source        = require('vinyl-source-stream');
const browserify    = require('browserify');
const babelify      = require('babelify');
const ngAnnotate    = require('browserify-ngannotate');
const browserSync   = require('browser-sync').create();
const rename        = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const uglify        = require('gulp-uglify');
const jshint        = require('gulp-jshint');
const stylish       = require('jshint-stylish');
const sass          = require('gulp-sass');
const concat        = require('gulp-concat');
const clean         = require('gulp-clean');
const nodemon       = require('gulp-nodemon');
const sequence      = require('gulp-sequence');

const jsFiles   = "src/app/**/*.js";
const viewFiles = "src/app/**/*.html";
const scssFiles = "src/app/**/*.scss";

let interceptErrors = function(error) {
  let args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/app/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      .pipe(source('main.js'))
      .pipe(gulp.dest('./static/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./static/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/app/config/'));
});

gulp.task('lint', function () {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint({'esversion':6}))
    .pipe(jshint.reporter(stylish));
});

gulp.task('copy:images', function () {
     return gulp
      .src('src/images/*.*')
      .pipe(gulp.dest('static/images'));
});

gulp.task('sass', function () {
  return gulp.src('./src/app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/tmp-scss/'));
});

gulp.task('concat:sass', function() {
  return gulp.src('./static/tmp-scss/**/*.css')
     .pipe(concat('all.css'))
     .pipe(gulp.dest('./static/'));
});

gulp.task('sass:clean', function() {
  return gulp.src('./static/all.scss', {read: false})
    .pipe(clean());
})

gulp.task('sass:cleantmp', function() {
  return gulp.src('./static/tmp-scss/', {read: false})
    .pipe(clean());
})

gulp.task('server', function (cb) {
  var started = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true; 
    } 
  });
});

gulp.task('sass-sequence', function(callback) {
  sequence('sass:clean', 'sass', 'concat:sass', 'sass:cleantmp')(callback)
});

gulp.task('watch', ['server'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8000",
        files: ["./static/**/*.*"],
        notify: false,
        port: 7000,
        ui: {
          port: 7001
        },
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['sass-sequence']);
});

gulp.task('default', sequence(['html', 'browserify', 'lint', 'copy:images'],
  'sass-sequence', 'watch'));
