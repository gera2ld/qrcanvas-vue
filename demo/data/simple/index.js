const { QRCanvas } = require('qrcanvas-vue');

new Vue({
  components: {
    QrCanvas: QRCanvas,
  },
  data: {
    options: {
      cellSize: 8,
      data: 'hello, world',
    },
  },
})
.$mount(root);
