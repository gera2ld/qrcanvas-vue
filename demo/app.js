const menu = $('#menu');
const content = $('#content');
const LOADER = '<div class="loading loading-lg"></div>';
const demos = [
  { name: 'Simple', path: 'simple' },
  { name: 'Input', path: 'input' },
  { name: 'Logo', path: 'logo' },
];
const modules = {
  qrcanvas: {
    exports: qrcanvas,
  },
  'qrcanvas-vue': {
    exports: qrcanvas.vue,
  },
};
let active;
demos.forEach(item => {
  menu.append(createElement('li', {
    className: 'menu-item',
  }, [
    item.el = createElement('a', {
      href: `#${item.path}`,
      textContent: item.name,
    }),
  ]));
});

window.addEventListener('hashchange', handleHashChange, false);
handleHashChange();

FallbackJs.ok();

function requireModule(name) {
  const module = modules[name];
  if (!module) throw new Error(`Module not found: ${name}`);
  return module.exports;
}

async function downloadUrl(url) {
  const res = await fetch(url);
  return res.text();
}

async function loadModule(name, url) {
  const code = await downloadUrl(url);
  const fn = new Function('require', 'module', 'exports', code);
  const module = {
    exports: {},
  };
  fn(requireModule, module, module.exports);
  modules[name] = module;
}

function handleHashChange() {
  const path = window.location.hash.slice(1);
  const demo = demos.find(item => item.path === path) || demos[0];
  showDemo(demo);
}

async function showDemo(demo) {
  if (active) active.el.classList.remove('active');
  active = demo;
  active.el.classList.add('active');
  content.innerHTML = LOADER;
  const item = await loadResource(demo);
  content.innerHTML = '';
  let container;
  content.append(
    createElement('h3', { textContent: item.name }),
    container = createElement('div', {
      className: 'my-2 text-center',
      innerHTML: item.html,
    }),
    createElement('pre', {
      className: 'code',
    }, [
      createElement('code', {
        innerHTML: Prism.highlight(item.html, Prism.languages.html),
      }),
    ]),
    createElement('pre', {
      className: 'code',
    }, [
      createElement('code', {
        innerHTML: Prism.highlight(item.code, Prism.languages.javascript),
      }),
    ]),
  );
  const fn = new Function('require', 'root', item.code);
  fn(requireModule, container.firstChild);
}

async function loadResource(item) {
  if (item.code) return item;
  [item.code, item.html] = await Promise.all([
    'index.js',
    'index.html',
  ].map(file => downloadUrl(`data/${item.path}/${file}`)));
  return item;
}

function $(selector) {
  return document.querySelector(selector);
}

function createElement(tagName, props, children) {
  const el = document.createElement(tagName);
  if (props) {
    Object.keys(props).forEach(key => {
      const value = props[key];
      if (key === 'on') {
        bindEvents(el, value);
      } else {
        el[key] = value;
      }
    });
  }
  if (children) {
    children.forEach(child => {
      el.append(child);
    });
  }
  return el;
}

function bindEvents(el, events) {
  if (events) {
    Object.keys(events).forEach(type => {
      const handle = events[type];
      if (handle) el.addEventListener(type, handle);
    });
  }
  return el;
}
