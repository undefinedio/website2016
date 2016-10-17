var autoprefixer = require("gulp-autoprefixer");
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require("gulp-concat");
var data = require("gulp-data");
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var buffer = require('gulp-buffer');
var sass = require("gulp-sass");
var browserSync = require('browser-sync');

var PATHS = {
    assets: "dist/assets",
    dist: "dist",
    fonts: "source/fonts/*.*",
    html: "source/templates/",
    js: "source/javascripts/**/*.js",
    jsEntry: "source/javascripts/main.js",
    root: "./",
    scss: "source/stylesheets/**/*.scss"
};

gulp.task("html", function () {
    return gulp.src([PATHS.html + 'start.html', PATHS.html + 'slides/*.*', PATHS.html + 'end.html'])
        .pipe(concat('index.html'))
        .pipe(gulp.dest(PATHS.dist))
});

gulp.task("js", function () {
    return browserify({
        paths: [PATHS.js],
        entries: PATHS.jsEntry,
        debug: true,
        transform: [
            [
                babelify, {
                presets: ["es2015"]
            }
            ]
        ]
    })
        .transform(babelify)
        .bundle().on('error', function (error) {
            gutil.log(gutil.colors.red('[Build Error]', error.message));
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(PATHS.assets))
});

gulp.task("sass", function () {
    return gulp.src(PATHS.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(PATHS.assets))
});

gulp.task("fonts", function () {
    return gulp.src(PATHS.fonts)
        .pipe(gulp.dest(PATHS.assets))
});

gulp.task("connect", function () {
    var options = {
        server: {
            baseDir: "./dist"
        },
        notifications: false,
        open: false // Change it to true if you wish to allow Browsersync to open a browser window.
    };

    browserSync(options);

    gulp.watch(PATHS.js, ["watch-js"]);
    gulp.watch(PATHS.scss, ["watch-sass"]);
    gulp.watch(PATHS.html + "**/*", ["watch-html"])
});

gulp.task('watch-js', ['js'], browserSync.reload);
gulp.task('watch-sass', ['sass'], browserSync.reload);
gulp.task('watch-html', ['html'], browserSync.reload);

gulp.task("default", ["build", "connect"]);
gulp.task("build", ["js", "sass", "fonts", "html"]);
