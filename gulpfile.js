const gulp = require('gulp');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const changed = require('gulp-changed');

const paths = {
    html: 'src/**/template/',
    sass: './public/scss',
    js: './public/js',
    img: './public/img',
    build: './dist'
};

const onError = (error) => {
    gutil.beep();
    gutil.log(gutil.colors.red(error));
};

const server = () => {
    livereload.listen();
    nodemon({
        script: 'bootstrap.js ',
        ext: 'js',
        exec: './run.sh babel-node' 
    }).on('restart', () => {
        gulp.src('bootstrap.js')
            .pipe(livereload())
            .pipe(notify('reloading...'));
    });
};

gulp.task('build-html', () => {
    return gulp.src(paths.html.concat('**/*.ejs'))
                .pipe(gulp.dest(paths.build.concat('/views')))
                .pipe(livereload());
});

gulp.task('build-css', () => {
    return gulp.src(paths.sass.concat('/*.scss'))
                .pipe(sass({
                    includePaths: require('node-neat').includePaths,
                    style: 'nested',
                    onError: () => console.log('Sass error')
                }))
                .pipe(plumber({ errorHandler: onError }))
                .pipe(gulp.dest(paths.build.concat('/css')))
                .pipe(livereload());
});

gulp.task('build-js', () => {
    return gulp.src(paths.js.concat('**/*.js'))
                .pipe(plumber({ errorHandler: onError }))
                .pipe(changed(paths.build.concat('/js')))
                .pipe(gulp.dest(paths.build.concat('/js')))
                .pipe(livereload());
});

gulp.task('build-img', () => {
    return gulp.src(paths.img.concat('/*.*'))
                .pipe(changed(paths.build.concat('/img')))
                .pipe(gulp.dest(paths.build.concat('/img')))
                .pipe(livereload());
});

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-img'], () => {
    return server();
});

gulp.task('watch', () => {
    gulp.watch(paths.html.concat('**/*.ejs'), ['build-html']);
    gulp.watch(paths.sass.concat('/*.scss'), ['build-css']);
    gulp.watch(paths.js.concat('**/*.js'), ['build-js']);
    gulp.watch(paths.img.concat('/*.*'), ['build-img']);
});

const env = process.env.NODE_ENV || 'dev';

if(env === 'dev') {
    return gulp.task('default', ['build','watch']);
}