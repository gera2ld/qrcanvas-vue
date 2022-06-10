import Vue from 'https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.min.js';
import { loadComponent, tw, demos, start, onVersionChange } from '../common.js';

let demoApp;
let app;
start({
  onStart: main,
  onRender: showDemo,
  Vue,
  version: 2,
});

function main() {
  const command = Prism.highlight('$ npm i vue@legacy qrcanvas-vue@2', Prism.languages.bash);
  const readme = `
<p>This a QRCode component for use with vue@2, based on <a href="https://github.com/gera2ld/qrcanvas" target="_blank" rel="noopener noreferrer">qrcanvas</a>.</p>
<pre class="code language-bash"><code>${command}</code></pre>
`;
  app = new Vue({
    data() {
      return {
        active: null,
        demos,
        readme,
      };
    },
    methods: {
      tw,
      onVersionChange,
    },
  });
  app.$mount('#app');
}

async function showDemo(path) {
  if (demoApp) {
    demoApp.$destroy();
    demoApp = null;
  }
  app.active = demos.find(item => item.path === path);
  if (!app.active) return;
  const component = await loadComponent(app.active, 'v2');
  const content = app.$refs.content;
  content.innerHTML = '<div></div>';
  demoApp = new Vue({
    ...component,
    template: app.active.data.html,
  });
  demoApp.$mount(content.firstChild);
}
