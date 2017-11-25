const Qrcanvas = require('qrcanvas-vue');

new Vue({
  components: {
    Qrcanvas,
  },
  data: {
    text: 'hello, world',
  },
  computed: {
    options() {
      return {
        cellSize: 8,
        data: this.text,
      };
    },
  },
})
.$mount(root);
