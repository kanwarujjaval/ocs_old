/**
 * Created by ujjaval on 5/6/15.
 */
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var pl = require('gulp-load-plugins')({
    rename: {
        'gulp-minify-css': 'mincss'
    }
});

var paths = {
    assets:['core/**/*.js', 'public/yellow/**/*.js'],
    core: 'core/**/*.js',
    angular:'public/yellow/**/*.js',
    controllers:'public/yellow/controllers/*.js',
    services:'public/yellow/services/*.js',
    styles: 'public/style/*.css',
    index: 'views/index.html',
    partials: 'views/*.html',
    build:'public/app',
    scripts:'views/scripts.html',
    scriptsDev:'views/scriptsProd.html',
    js:'public/js/*.js',
    buildFiles:['public/app/*.min.js','public/app/*.min.css']
};

gulp.task('lintNode', function () {
    return gulp.src(paths.core)
        .pipe(pl.jshint())
        .pipe(pl.jshint.reporter('jshint-stylish'));
});

gulp.task('lintAngular', function () {
    return gulp.src(paths.angular)
        .pipe(pl.jshint())
        .pipe(pl.jshint.reporter('jshint-stylish'));
});

gulp.task('angularBuild', function () {
    return gulp.src(paths.angular)
        .pipe(pl.concat('global.js'))
        .pipe(gulp.dest(paths.build))
        .pipe(pl.rename('global.min.js'))
        .pipe(pl.uglify({mangle: false}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('jsBuild', function () {
    return gulp.src(paths.js)
        .pipe(pl.concat('scripts.js'))
        .pipe(gulp.dest(paths.build))
        .pipe(pl.rename('scripts.min.js'))
        .pipe(pl.uglify())
        .pipe(gulp.dest(paths.build));
});

gulp.task('cssBuild', function () {
    gulp.src(paths.styles)
        .pipe(pl.concat('style.css'))
        .pipe(gulp.dest(paths.build))
        .pipe(pl.mincss({compatibility: 'ie8'}))
        .pipe(pl.rename('style.min.css'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('injectDev', function () {
        gulp.src('views/scripts.html')
            .pipe(pl.inject(gulp.src(bowerFiles(),{ base: 'public/lib' } ,{read: false}), {name: 'bower'}))
            .pipe(pl.inject(gulp.src([paths.services,paths.controllers,paths.styles,paths.js])))
            .pipe(gulp.dest('views/'));
    }
);

gulp.task('injectProd',function(){
    gulp.src('views/scriptsProd.html')
        //.pipe(pl.inject(gulp.src(bowerFiles(),{ base: 'public/lib' } ,{read: false}), {name: 'bower'}))
        //stop bower injections into prod file
        .pipe(pl.inject(gulp.src(paths.buildFiles)))
        .pipe(gulp.dest('views/'));
});

gulp.task('demon',function(){
    pl.nodemon({
        script:'server.js',
        ext:'js',
        env:{
            'NODE_ENV':'development'
        },
        tasks: ['lintNode','lintAngular', 'angularBuild','jsBuild','cssBuild','injectDev','injectProd']
    }).on('restart', function () {
        console.log('restarted!')
    })
});

gulp.task('default', ['demon','lintNode','lintAngular', 'angularBuild','jsBuild','cssBuild','injectDev','injectProd']);

gulp.task('test', ['lintNode','lintAngular', 'angularBuild','jsBuild','cssBuild','injectDev','injectProd'],function(){
    console.log("done!");
});
