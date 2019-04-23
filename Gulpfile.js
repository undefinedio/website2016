var autoprefixer = require("gulp-autoprefixer");
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require("gulp-concat");
var data = require("gulp-data");
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var gulp = require("gulp");
var audiosprite = require('gulp-audiosprite');
var newer = require('gulp-newer');
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var buffer = require('gulp-buffer');
var sass = require("gulp-sass");
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

var PATHS = {
    assets: "dist/assets/",
    dist: "dist",
    fonts: "source/fonts/*.*",
    lib: "source/lib/**/*.*",
    sounds: "source/sounds/*.*",
    images: "source/images/",
    html: "source/templates/",
    slides: "source/templates/slides/*.*",
    js: "source/javascripts/**/*.js",
    jsEntry: "source/javascripts/main.js",
    root: "./",
    scss: "source/stylesheets/**/*.scss"
};

gulp.task('fonts', function () {
    var fontgen = require('gulp-fontgen');

    return gulp.src(PATHS.fonts)
        .pipe(fontgen({
            dest: PATHS.assets + '/fonts'
        }));
});

gulp.task("html", function () {
    return gulp.src([PATHS.html + 'start.html', PATHS.slides, PATHS.html + 'end.html'])
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
        // .pipe(minify())
        // .pipe(uglify())
        .pipe(gulp.dest(PATHS.assets))
});

gulp.task("sass", function () {
    return gulp.src(PATHS.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.assets))
});

gulp.task('lib', function () {
    return gulp.src(PATHS.lib)
        .pipe(gulp.dest(PATHS.dist + '/lib'));
});

gulp.task("audio", function () {
    gulp.src(PATHS.sounds)
        .pipe(audiosprite({
            format: 'howler',
            path: "assets/sounds",
            loop: ["taalunie01", "taalunie02"]
        }))
        .pipe(gulp.dest(PATHS.assets + '/sounds'));
});

gulp.task("images", function () {
    return gulp.src(PATHS.images + ['**/*.*'])
        .pipe(newer(PATHS.assets + 'images'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(PATHS.assets + 'images'))
});

gulp.task("connect", function () {
    var options = {
        server: {
            baseDir: "./dist"
        },
        notifications: false,
        open: false
    };

    browserSync(options);

    gulp.watch(PATHS.js, ["watch-js"]);
    gulp.watch(PATHS.scss, ["watch-sass"]);
    gulp.watch(PATHS.html + "**/*", ["watch-html"]);
    gulp.watch(PATHS.images + "**/*", ["watch-images"]);
    gulp.watch(PATHS.fonts + "**/*", ["watch-fonts"]);
});

gulp.task('watch-js', ['js'], browserSync.reload);
gulp.task('watch-sass', ['sass'], browserSync.reload);
gulp.task('watch-html', ['html'], browserSync.reload);
gulp.task('watch-images', ['images'], browserSync.reload);
gulp.task('watch-fonts', ['fonts'], browserSync.reload);

gulp.task("default", ["build", "connect"]);
gulp.task("build", ["sass", "js", "images", "html", "lib"]);
