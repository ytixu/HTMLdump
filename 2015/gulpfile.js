var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./'));
});

gulp.task('jade', function () {
    gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'));
});