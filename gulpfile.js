// Gulp
var gulp = require('gulp');
var copy = require('gulp-copy');
var data = require('gulp-data');
var del = require('del');
var _ = require('lodash');

// JS
var transform = require('vinyl-transform');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

// CSS
var minifyCSS = require('gulp-minify-css');

// HTML
var fm = require('gulp-front-matter');
var swig = require('gulp-swig');
var marked = require('swig-marked');
marked.configure({
    breaks: true
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var paths = {
    data:     ['./src/*.json'],
    css:      ['./src/**/*.css'],
    js:       ['./src/**/*.js'],
    images:   ['./src/images/*.*'],
    html:     ['./src/html/index.html'],
    markdown: ['./src/html/*.md']
};

//------------------------------------------------------------------------------

gulp.task('clean', function(cb){
    del([
        './dist'
    ], cb);
});

//------------------------------------------------------------------------------

gulp.task('css', function(){
    return gulp.src(paths.css)
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist'));
});

//------------------------------------------------------------------------------

gulp.task('js', function(){
    var browserified = transform(function(filename){
        return browserify(filename).bundle();
    });

    return gulp.src(paths.js)
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

//------------------------------------------------------------------------------

gulp.task('images', function(){
    return gulp.src(paths.images)
        .pipe(copy('./dist', { prefix: 1 }));
});

//------------------------------------------------------------------------------

gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(data(function(file){
            return require('./src/data.json');
        }))
        .pipe(swig({
            defaults: {
                cache: false
            },
            setup: function(swig) {
                marked.useTag(swig, 'markdown');
            }
        }))
        .pipe(gulp.dest('./dist'));
});

//------------------------------------------------------------------------------

gulp.task('watch', ['default'], function(){
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.data, ['html']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.markdown, ['html']);
});

//------------------------------------------------------------------------------

gulp.task('default', ['css', 'js', 'images', 'html']);
