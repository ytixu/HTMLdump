var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jsmin = require('gulp-jsmin'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename');

gulp.task('sass', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('scripts', function () {
    return gulp.src('src/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./scripts'));
});

gulp.task('babel', function () {
    return gulp.src('src/babel/*.js')
        .pipe(babel())
        .pipe(gulp.dest('src'));
});