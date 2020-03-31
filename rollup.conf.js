const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const { getRollupPlugins, getExternal, DIST } = require('./scripts/util');
const pkg = require('./package.json');

const FILENAME = 'qrcanvas-vue';
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getExternal([
  'qrcanvas',
  'vue',
]);
const bundleOptions = {
  extend: true,
  esModule: false,
};
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
      plugins: getRollupPlugins({ esm: true }),
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
      plugins: getRollupPlugins({ esm: true }),
      external: ['qrcanvas', 'vue'],
    },
    output: {
      format: 'iife',
      file: `${DIST}/${FILENAME}.js`,
      name: 'qrcanvas.vue',
      globals: {
        qrcanvas: 'qrcanvas',
        vue: 'Vue',
      },
      ...bundleOptions,
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
rollupConfig.filter(({ minify }) => minify)
.forEach(config => {
  rollupConfig.push({
    input: {
      ...config.input,
      plugins: [
        ...config.input.plugins,
        terser(),
      ],
    },
    output: {
      ...config.output,
      file: config.output.file.replace(/\.js$/, '.min.js'),
    },
  });
});

rollupConfig.forEach((item) => {
  item.output = {
    indent: false,
    // If set to false, circular dependencies and live bindings for external imports won't work
    externalLiveBindings: false,
    ...item.output,
    ...BANNER && {
      banner: BANNER,
    },
  };
});

module.exports = rollupConfig.map(({ input, output }) => ({
  ...input,
  output,
}));
