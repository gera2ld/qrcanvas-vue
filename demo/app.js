const { setup, apply, tw } = twind;

setup({
  preflight: (preflight) => ({
    ...preflight,
    a: apply`text-blue-600 hover:text-blue-700 no-underline`,
    canvas: apply`border border-gray-400`,
    '[v-cloak]': apply`hidden`,
    'pre.code': apply`my-4`,
    pre: apply`block p-4 bg-gray-100 overflow-x-auto`,
    'input, select': apply`border border-gray-400 focus:border-gray-600`,
    '.menu a': apply`block p-2 cursor-pointer`,
    '.menu a:hover, .menu a.active': apply`bg-blue-200`,
  }),
});

const demos = [
  { name: 'Simple', path: 'simple' },
  { name: 'Input', path: 'input' },
  { name: 'Logo', path: 'logo' },
  { name: 'Fixed size', path: 'fixed-size' },
];
const modules = {
  vue: {
    exports: Vue,
  },
  qrcanvas: {
    exports: qrcanvas,
  },
  'qrcanvas-vue': {
    exports: qrcanvas.vue,
  },
};
let demoApp;
const active = Vue.ref(null);
const content = Vue.ref(null);
main();

function main() {
  const app = Vue.createApp({
    setup() {
      return {
        active,
        content,
        demos,
        tw,
        onVersionChange(e) {
          if (e.target.value === '2') {
            window.location.href = '../v2/';
          }
        },
      };
    },
  });
  app.mount('#app');
  window.addEventListener('hashchange', handleHashChange, false);
  handleHashChange();
  FallbackJs.ok();
}

function requireModule(name) {
  const module = modules[name];
  if (!module) throw new Error(`Module not found: ${name}`);
  return module.exports;
}

async function downloadUrl(url) {
  const res = await fetch(url);
  return res.text();
}

function runModule(code) {
  const fn = new Function('require', 'module', 'exports', code);
  const module = {
    /** @type any */
    exports: {},
  };
  fn(requireModule, module, module.exports);
  return module;
}

// async function loadModule(name, url) {
//   const code = await downloadUrl(url);
//   modules[name] = runModule(code);
// }

function handleHashChange() {
  const path = window.location.hash.slice(1);
  active.value = demos.find(item => item.path === path);
  showDemo();
}

async function showDemo() {
  if (demoApp) {
    demoApp.unmount();
    demoApp = null;
  }
  if (!active.value) return;
  const item = await loadResource(active.value);
  const component = runModule(item.code).exports;
  demoApp = Vue.createApp(component);
  demoApp.mount(content.value);
}

async function loadResource(item) {
  if (item.code) return item;
  item.html = '';
  [item.code, item.html] = await Promise.all([
    'index.js',
    'index.html',
  ].map(file => downloadUrl(`data/${item.path}/${file}`)));
  item.highlightedCode = Prism.highlight(item.code, Prism.languages.javascript);
  item.highlightedHTML = Prism.highlight(item.html, Prism.languages.html);
  return item;
}
