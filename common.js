import { hm } from 'https://cdn.jsdelivr.net/npm/@gera2ld/jsx-dom/+esm';
import { setup, apply, tw } from 'https://cdn.jsdelivr.net/npm/twind/+esm';

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
['https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css'].forEach(loadCSS);

export { tw };

export const demos = [
  { name: 'Simple', path: 'simple' },
  { name: 'Input', path: 'input' },
  { name: 'Logo', path: 'logo' },
  { name: 'Fixed size', path: 'fixed-size' },
  { name: 'Padding', path: 'padding' },
  { name: 'Gradient', path: 'gradient' },
].map(item => ({ ...item, data: null }));

const modules = {};

export async function start({ onStart, onRender, Vue, version }) {
  window.Vue = Vue;
  // qrcanvas-vue depends on window.Vue
  await Promise.all([
    'https://cdn.jsdelivr.net/combine/npm/prismjs@1.25.0/prism.min.js,npm/prismjs@1.25.0/components/prism-bash.min.js,npm/qrcanvas@3',
    `https://cdn.jsdelivr.net/npm/qrcanvas-vue@${version}`,
  ].map(loadJS));
  Object.assign(modules, {
    vue: {
      exports: Vue,
    },
    qrcanvas: {
      exports: qrcanvas,
    },
    'qrcanvas-vue': {
      exports: qrcanvas.vue,
    },
  });
  const html = await downloadUrl('../common.html');
  document.body.append(hm('div', { innerHTML: html }));
  onStart();

  const handleHashChange = () => {
    const path = window.location.hash.slice(1);
    onRender(path);
  };
  window.addEventListener('hashchange', handleHashChange, false);
  handleHashChange();
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

async function loadResource(item, name) {
  if (item.data) return item;
  const data = {
    code: '',
    html: '',
    highlightedCode: '',
    highlightedHTML: '',
  };
  [data.code, data.html] = await Promise.all([
    `${name}.js`,
    'index.html',
  ].map(file => downloadUrl(`../data/${item.path}/${file}`)));
  data.highlightedCode = Prism.highlight(data.code, Prism.languages.javascript);
  data.highlightedHTML = Prism.highlight(data.html, Prism.languages.html);
  item.data = data;
}

export async function loadComponent(item, name) {
  await loadResource(item, name);
  return runModule(item.data.code).exports;
}

function loadJS(src) {
  return new Promise((resolve, reject) => {
    const script = hm('script', {
      src,
      onLoad: resolve,
      onError: reject,
    });
    document.body.append(script);
  });
}

function loadCSS(href) {
  document.head.append(hm('link', {
    rel: 'stylesheet',
    href,
  }));
}

export function onVersionChange(e) {
  window.location.href = `../v${e.target.value}/`;
}
