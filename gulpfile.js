// Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');


// Função para compilar SASS e add os prefixos
function compilaSass() {
  return gulp.src('css/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

// Tarefa do Gulp para a função do SASS
gulp.task('sass', compilaSass);
 
// Função para juntar os arquivos .js
function gulpJS() {
  return gulp.src('js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('js/'))
}

// Tarefa do Gulp para juntar os arquivos .js
gulp.task('mainjs', gulpJS);

// Função para iniciar o Browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
}

// Tarefa para iniciar Browser-Sync
gulp.task('browser-sync', browser);

// Função de Watch do Gulp
function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

// Inicia a tarefa de Watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp que inicializa Watch e o Browser-Sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));