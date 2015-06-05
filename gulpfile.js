/**
 * Created by ujjaval on 5/6/15.
 */
var gulp = require('gulp');
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
    build:'public/app'
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
        .pipe(pl.uglify())
        .pipe(gulp.dest(paths.build));
});

gulp.task('css', function () {
    gulp.src(paths.styles)
        .pipe(pl.concat('style.css'))
        .pipe(gulp.dest(paths.build))
        .pipe(pl.mincss({compatibility: 'ie8'}))
        .pipe(pl.rename('style.min.css'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('demon',function(){
    pl.nodemon({
        script:'server.js',
        ext:'js',
        env:{
            'NODE_ENV':'development'
        },
        tasks: ['lintNode','lintAngular', 'angularBuild','css']
    }).on('restart', function () {
        console.log('restarted!')
    })
});

gulp.task('default', ['demon','lintNode','lintAngular', 'angularBuild','css']);
