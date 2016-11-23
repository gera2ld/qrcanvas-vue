const Vue = require('vue');
const Qrcanvas = require('qrcanvas-vue');

const options = {
  data: 'Hello world',
};

new Vue({
  el: '#app',
  render(h) {
    return h(Qrcanvas, {
      props: {
        options,
      },
    });
  },
});
