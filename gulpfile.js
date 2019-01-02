const path = require('path');
const gulp = require('gulp');
const log = require('fancy-log');
const rollup = require('rollup');
const del = require('del');
const { uglify } = require('rollup-plugin-uglify');
const { getRollupPlugins, getExternal } = require('./scripts/util');

const DIST = 'lib';
const FILENAME = 'qrcanvas-vue';

const external = getExternal([
  'qrcanvas',
  'vue',
]);
const rollupConfig = [
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins(),
      external,
    },
    output: {
      format: 'cjs',
      file: `${DIST}/${FILENAME}.common.js`,
    },
  },
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins(),
      external,
    },
    output: {
      format: 'esm',
      file: `${DIST}/${FILENAME}.esm.js`,
    },
  },
  {
    input: {
      input: 'src/index.ts',
      plugins: getRollupPlugins({ browser: true }),
      external,
    },
    output: {
      format: 'umd',
      file: `${DIST}/${FILENAME}.js`,
      name: 'qrcanvas.vue',
      globals: {
        qrcanvas: 'qrcanvas',
        vue: 'Vue',
      },
    },
    minify: true,
  },
  {
    input: {
      input: 'src/component.ts',
      plugins: getRollupPlugins(),
      external,
    },
    output: {
      format: 'cjs',
      file: `${DIST}/${FILENAME}.component.js`,
    },
  },
];
// Generate minified versions
Array.from(rollupConfig)
.filter(({ minify }) => minify)
.forEach(config => {
  rollupConfig.push({
    input: {
      ...config.input,
      plugins: [
        ...config.input.plugins,
        uglify(),
      ],
    },
    output: {
      ...config.output,
      file: config.output.file.replace(/\.js$/, '.min.js'),
    },
  });
});

function clean() {
  return del([DIST, 'types']);
}

function buildJs() {
  return Promise.all(rollupConfig.map(config => {
    return rollup.rollup(config.input)
    .then(bundle => bundle.write(config.output));
  }));
}

function wrapError(handle) {
  const wrapped = () => handle()
  .catch(err => {
    log(err.toString());
  });
  wrapped.displayName = handle.name;
  return wrapped;
}

function watch() {
  gulp.watch('src/**', safeBuildJs);
}

const safeBuildJs = wrapError(buildJs);

exports.clean = clean;
exports.build = buildJs;
exports.dev = gulp.series(safeBuildJs, watch);
