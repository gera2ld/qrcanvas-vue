const Qrcanvas = require('qrcanvas-vue');

new Vue({
  components: {
    Qrcanvas,
  },
  data: {
    options: {
      cellSize: 8,
      data: 'hello, world',
    },
  },
})
.$mount(root);
