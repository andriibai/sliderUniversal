var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cache = require('gulp-cache');

var paths = {
    html: './*.html',
    scss: 'assets/develop/scss/*.scss',
    scssAll: 'assets/develop/scss/**/*.scss',
    css: 'assets/prod/css',
    jsAll: ['assets/develop/js/jquery.min.js','assets/develop/js/slider-un.js'],
    js: 'assets/prod/js',
    img: 'assets/develop/img/**/*',
    imgProd: 'assets/prod/img'
};

gulp.task('scss', function(){
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(cssnano({
            reduceIdents: false,
            autoprefixer: {
                browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
                add: true
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src(paths.jsAll)
        .pipe(concat('slider-un.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        //proxy: 'http://localhost/',
        notify: true
    });
});

gulp.task('img',  async function() {
    gulp.src(paths.img)
        .pipe(gulp.dest(paths.imgProd))
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', function() {
    gulp.watch([paths.scssAll, paths.scss], gulp.parallel('scss'));
    gulp.watch(paths.jsAll, gulp.parallel('scripts'));
    gulp.watch(paths.html, gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'scss', 'scripts', 'img','clear'));
