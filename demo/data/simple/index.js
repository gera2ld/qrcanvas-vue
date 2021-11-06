const { createApp } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = createApp({
  components: {
    qrcanvas: QRCanvas,
  },
  setup() {
    return {
      options: {
        cellSize: 8,
        data: 'hello, world',
      },
    };
  },
});
