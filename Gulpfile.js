var autoprefixer = require("gulp-autoprefixer");
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require("gulp-concat");
var connect = require("gulp-connect");
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

var paths = {
    assets: "assets",
    fonts: "source/fonts/*.*",
    html: "source/templates/",
    js: "source/javascripts/**/*.js",
    jsEntry: "source/javascripts/main.js",
    root: "./",
    scss: "source/stylesheets/**/*.scss"
};

gulp.task("html", function () {
    return gulp.src([paths.html + 'start.html', paths.html + 'slides/*.*', paths.html + 'end.html'])
        .pipe(concat('index.html'))
        .pipe(gulp.dest(paths.root))
        .pipe(connect.reload())
});

gulp.task("js", function () {
    return browserify({
        paths: [paths.js],
        entries: paths.jsEntry,
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
        .pipe(gulp.dest(paths.assets))
});

gulp.task("sass", function () {
    return gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.assets))
        .pipe(connect.reload())
});

gulp.task("fonts", function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.assets))
        .pipe(connect.reload())
});

gulp.task("connect", function () {
    var options = {
        server: {
            baseDir: "./"
        },
        notifications: false,
        open: false // Change it to true if you wish to allow Browsersync to open a browser window.
    };

    browserSync(options);

    gulp.watch(paths.js, ["watch-js"]);
    gulp.watch(paths.scss, ["watch-sass"]);
    gulp.watch(paths.html + "**/*", ["watch-html"])
});

gulp.task('watch-js', ['js'], browserSync.reload);
gulp.task('watch-sass', ['sass'], browserSync.reload);
gulp.task('watch-html', ['html'], browserSync.reload);

gulp.task("default", ["build", "connect"]);
gulp.task("build", ["js", "sass", "fonts", "html"]);
