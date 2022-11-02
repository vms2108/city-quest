const Gulp = require('gulp');
const execSync = require('child_process').execSync;

// function replaceType(cb) {    
//     src(['dist/frontend-admin/index.html'])
//         .pipe(replace('type="module"', 'type="text/javascript"'))
//         .pipe(dest('dist/frontend-admin/'));
//     cb();
// };


function build(generateStats = false, optimize = false, prod = true, stage = false) {
  execSync(
    `ng build` +
    (prod ? ' --configuration "production"' : '') +
    (generateStats ? ' --statsJson' : '') +
    (optimize ? ' --build-optimizer' : '') +
    (stage ? ' --configuration=stage' : ''),
    {stdio: 'inherit'}
  )
}

function showWebpackReport() {
  build( true);
  execSync(
    `node ./node_modules/webpack-bundle-analyzer/lib/bin/analyzer ./dist/stats.json`,
    {stdio: "inherit"}
  )
}

function serve(stage = false) {
  const environment = getEnvironment();
  execSync(
    'ng serve' +
    (stage ? ' --configuration=stage' : '') +
    ` --proxy-config conf/${environment.env}/proxy.conf.json`,
    {stdio: "inherit"}
  )
}

Gulp.task('start:jit', (callback) => {
  callback(serve(false));
});

Gulp.task('start:stage', (callback) => {
  callback(serve(true));
});

Gulp.task('build', (callback) => {
  callback(build(false, false, false));
});

Gulp.task('build:production', (callback) => {
  callback(build(false, true));
});

Gulp.task('build:opt', (callback) => {
  callback(build(false, true));
});

Gulp.task('build:stats', (callback) => {
  callback(build(true, true));
});

Gulp.task('report', (callback) => {
  callback(showWebpackReport());
});

Gulp.task('build:stage', (callback) => {
  callback(build(false, true, true, true));
});

function getEnvironment() {
  let args = {};
  try {
    JSON.parse(process.env.npm_config_argv).original
      .filter(arg => arg.startsWith("--"))
      .map(arg => arg.substring(2))
      .map(arg => arg.split("="))
      .forEach(arg => args[arg[0]] = arg[1]);
  } catch (e) {
  }

  if (!args.env) {
    console.warn("'--env' argument isn't specified, default value 'test' will be used");
  }

  return {env: 'test', ...args};
}
