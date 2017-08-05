const gulp = require('gulp');

const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const watch = require("gulp-watch");
const batch = require("gulp-batch");

gulp.task('copy', function() {
  gulp.src('assets/**')
    .pipe(gulp.dest('./docs/assets'));
});

gulp.task('html', () => {
  return gulp.src('./src/pages/*.hbs')
    .pipe(handlebars({}, {
      ignorePartials: true,
      batch: ['./src/partials']
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('watch', function () {
  watch('src/**', batch(function (events, done) {
      gulp.start('html', done);
  }));
  watch('assets/**', batch(function (events, done) {
      gulp.start('copy', done);
  }));
});

gulp.task('default', ['copy', 'html']);