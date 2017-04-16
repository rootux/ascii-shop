var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var clean         = require('gulp-clean');
var nodemon       = require('gulp-nodemon');

var jsFiles   = "src/app/**/*.js";
var viewFiles = "src/app/**/*.html";
var scssFiles = "src/app/**/*.scss";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

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

gulp.task('copy:images', function () {
     return gulp
      .src('src/images/*.*')
      .pipe(gulp.dest('static/images'));
});

gulp.task('concat:sass', function() {
  return gulp.src('./src/**/*.scss')
     .pipe(concat('all.scss'))
     .pipe(gulp.dest('./static/'));
});

gulp.task('sass:clean', function() {
  return gulp.src('static/all.scss', {read: false})
        .pipe(clean());
})

gulp.task('sass', function () {
  return gulp.src('./static/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/'));
});

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

gulp.task('browser-sync', ['server'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8000",
        files: ["./static/**/*.*"],
        notify: false,
        port: 7000,
        ui: {
          port: 7001
        },
  });
});


gulp.task('default', ['browser-sync', 'html', 'browserify', 'concat:sass', 'sass', 'sass:clean', 'copy:images'], function() {
  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['concat:sass', 'sass', 'sass:clean']);
});
