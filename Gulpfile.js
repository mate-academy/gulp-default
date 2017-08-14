'use strict';

/* Подключение необходимых плагинов */
const gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    lessReporter = require('gulp-less-reporter'),
    csscomb = require('gulp-csscomb'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    staticServer = browserSync.create(),
    reload = staticServer.reload,
    jsonServer = require('json-server'),
    apiServer = jsonServer.create(),
    runSequence = require('run-sequence').use(gulp),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    nunjucksRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    autoprefixer = require('gulp-autoprefixer');

/* Конфигурация BrowserSync */
const config = {
    server: {
        baseDir: './build'
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    injectChanges: false,
    logPrefix: 'BrowserSync Log'
};

/* Конфигурация Api */
const apiConfig = {
    db:  path.resolve('./build/api/db.json'),
    port: 3000,
    hostname: 'localhost'
};

/* API server */
gulp.task('apiserver', function() {
    const router = jsonServer.router(apiConfig.db),
        middlewares = jsonServer.defaults();

    apiServer.use(middlewares);
    apiServer.use(router);
    apiServer.listen(apiConfig.port, () => {
        console.log('JSON Server is running');
    });
});

/* BrowserSync*/
gulp.task('webserver', function() {
    // browserSync(config);
    staticServer.init(config);
});

/* Run server merge BrowserSync and API */
gulp.task('devserver', function(next) {
    staticServer.init(config, function (err, server) {
        // crate api server
        const router = jsonServer.router(apiConfig.db),
            middlewares = jsonServer.defaults();

        apiServer.use(middlewares);
        apiServer.use(router);

        // add api server to browser-sync server instance
        server.app.use('/api', apiServer);
        next();
    });
});

gulp.task('js', function () {
    return browserify({
            entries: 'src/base.js'
        })
        .transform(babelify)
        .bundle()
        .on('error', err => {
            console.log("Browserify Error", err.message);
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('less', function() {
    return gulp.src(['src/base.less', 'src/blocks/**/*.less'])
        .pipe(less())
        .on('error', lessReporter)
        .pipe(csscomb())
        .pipe(concat('index.css'))
        .pipe(autoprefixer({
            browsers: 'last 4 version'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src('src/blocks/**/img/*.*')
        .pipe(gulp.dest('build/img/'))
        .pipe(reload({stream: true}));
});

gulp.task('static', function (cb) {
    return gulp.src('src/static/**/*')
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src(['src/pages/*.njk'])
        .pipe(data(function(file) {
            const filePath = path.resolve( 'src/data', path.parse(file.path).name ) + '.json';

            if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath));
            }

            return {};
        }))
        .pipe(nunjucksRender({
            path: ['./src/blocks/', './src/layouts/'],
            ext: '.html'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});

gulp.task('clean', function (cb) {
    return del(['build/**/*'], cb);
});

gulp.task('build', function(cb) {
    return runSequence('clean', 'static', 'less', 'images', 'js', 'html', cb);
});

gulp.task('watch', ['devserver'], function() {
    watch(['src/static/**/*'], function(event, cb) {
        gulp.start('static');
    });
    watch(['src/base.less', 'src/blocks/**/*.less'], function(event, cb) {
        gulp.start('less');
    });
    watch(['src/blocks/**/img/*.*'], function(event, cb) {
        gulp.start('images');
    });
    watch(['src/base.js','src/blocks/**/*.js'], function(event, cb) {
        gulp.start('js');
    });
    watch(['src/pages/*.njk', '.src/blocks/**/*.njk', './src/layouts/*.njk'], function(event, cb) {
        gulp.start('html');
    });
});

gulp.task('default', ['watch'], function() {});
