import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js';
import { loadComponent, tw, demos, start, onVersionChange } from '../common.js';

let demoApp;
const active = Vue.ref(null);
const content = Vue.ref(null);
start({
  onStart: main,
  onRender: showDemo,
  Vue,
  version: 3,
});

function main() {
  const command = Prism.highlight('$ npm i vue qrcanvas-vue', Prism.languages.bash);
  const readme = `
<p>This a QRCode component for use with vue@3, based on <a href="https://github.com/gera2ld/qrcanvas" target="_blank" rel="noopener noreferrer">qrcanvas</a>.</p>
<pre class="code language-bash"><code>${command}</code></pre>
`;
  const app = Vue.createApp({
    setup() {
      return {
        active,
        content,
        demos,
        tw,
        readme,
        onVersionChange,
      };
    },
  });
  app.mount('#app');
}

async function showDemo(path) {
  if (demoApp) {
    demoApp.unmount();
    demoApp = null;
  }
  active.value = demos.find(item => item.path === path);
  if (!active.value) return;
  const component = await loadComponent(active.value, 'v3');
  demoApp = Vue.createApp({
    ...component,
    template: active.value.data.html,
  });
  demoApp.mount(content.value);
}
