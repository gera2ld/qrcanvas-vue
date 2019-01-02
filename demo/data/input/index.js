const { QRCanvas } = require('qrcanvas-vue');

new Vue({
  components: {
    QrCanvas: QRCanvas,
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
