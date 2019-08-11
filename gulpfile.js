'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles/'));
});

gulp.task('clean', () => {
    return del([
        'app/styles/style.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', () => {
    gulp.watch('app/styles/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});
