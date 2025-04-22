const Gulp = require('gulp');
const execSync = require('child_process').execSync;
const { src, dest } = require('gulp');
const replace = require('gulp-replace');
const gzip = require('gulp-gzip');

// Существующие функции
function replaceType(cb) {
  src(['dist/main-website/index.html'], { allowEmpty: true })
    .pipe(replace('type="module"', 'type="text/javascript"'))
    .pipe(dest('dist/main-website/'))
    .on('end', cb); // Завершаем задачу
}

function build(generateStats = false, optimize = false, prod = true, stage = false) {
  execSync(
    `ng build` +
    (prod ? ' --configuration production' : '') +
    (generateStats ? ' --statsJson' : '') +
    (stage ? ' --configuration=stage' : ''),
    { stdio: 'inherit' }
  );
}

// Исправленная задача prerender с асинхронностью
function prerender(cb) {
  try {
    execSync('node server.js', { stdio: 'inherit' });
    cb(); // Успешное завершение
  } catch (error) {
    cb(error); // Передаем ошибку
  }
}

// Обновленные задачи
Gulp.task('start:jit', (callback) => {
  serve(false);
  callback(); // Завершаем задачу
});

Gulp.task('start:stage', (callback) => {
  serve(true);
  callback(); // Завершаем задачу
});

Gulp.task('build', (callback) => {
  build(false, false, false);
  callback();
});

Gulp.task('build:production', Gulp.series(
  (cb) => {
    build(false, true, true);
    cb();
  },
  replaceType
));

Gulp.task('build:prerender', Gulp.series(
  (cb) => {
    build(false, true, true);
    cb();
  },
  replaceType,
  prerender
));

Gulp.task('compress', function () {
  return Gulp.src(['./dist/**/*.*'])
    .pipe(gzip())
    .pipe(Gulp.dest('./dist'));
});

function serve(stage = false) {
  const environment = getEnvironment();
  execSync(
    'ng serve' +
    (stage ? ' --configuration production' : '') +
    ` --proxy-config conf/${environment.env}/proxy.conf.json`,
    { stdio: 'inherit' }
  );
}

function getEnvironment() {
  let args = {};
  try {
    JSON.parse(process.env.npm_config_argv).original
      .filter(arg => arg.startsWith("--"))
      .map(arg => arg.substring(2))
      .map(arg => arg.split("="))
      .forEach(arg => args[arg[0]] = arg[1]);
  } catch (e) {}

  if (!args.env) {
    console.warn(args);
    console.warn("'--env' argument isn't specified, default value 'test' will be used");
  }

  return { env: 'test', ...args };
}