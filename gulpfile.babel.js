import gulp from 'gulp';
import concat from 'gulp-concat';
import wrap from 'gulp-wrap';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import htmlhint from 'gulp-htmlhint';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import yargs from 'yargs';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import child from 'child_process';
import nodemon from 'nodemon';
import chalk from 'chalk';
import notify from 'gulp-notify';
import fontAwesome from 'node-font-awesome';

const exec = child.exec;
const argv = yargs.argv;
const root = 'src/';

const paths = {
  dist: './dist/',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles: `${root}/sass/*.scss`,
  templates: `${root}/app/**/*.html`,
  modules: [
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-loading-bar/build/loading-bar.min.js'
  ],
  static: [
    `${root}/index.html`,
    `${root}/fonts/**/*`,
    `${root}/img/**/*`
  ]
};

const handleError = function(err) {
    notify.onError("Error, check terminal for details.")(err);
    console.log(chalk.white.bgRed(' ------------------------------ '));
    console.log(chalk.white(err.message));
    console.log(chalk.white.bgRed(' ------------------------------ '));
    this.emit('end');
}

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'compressed', includePaths: fontAwesome.scssPath}))
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist + 'css/'));
});

//linting

gulp.task('style:js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('hint:html', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.failReporter());
});

//end linting



gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .on('error', handleError)
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `!${root}/app/**/*.spec.js`,
      `${root}/app/**/*.module.js`,
      ...paths.scripts,
      './templates.js'
    ])
    .on('error', handleError)
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

server.create();

gulp.task('serve', () => {
  return server.init({
    files: [root],
    port: 4000,
    server: {
      baseDir: paths.dist
    }
  });
});

gulp.task('nodemon', () => {
  gulp.src('server.js')
  var stream = nodemon({
    script: 'server.js'
  })
  return stream;
});

gulp.task('nodemon', () => {
  gulp.src('server.js')
  var stream = nodemon({
    script: 'server.js'
  })
  return stream;
})


gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templates, ['hint:html', 'styles']);
  gulp.watch(paths.scripts, ['style:js']);
});

gulp.task('lint', ['style:js', 'hint:html']);

gulp.task('default', [
  'copy',
  'styles',
  'lint',
  'serve',
  'watch'
]);

gulp.task('start', ['default']);

gulp.task('start nodemon', ['default']);

gulp.task('production', [
  'copy',
  'scripts'
]);