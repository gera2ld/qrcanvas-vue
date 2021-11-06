const Vue = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = new Vue({
  components: {
    qrcanvas: QRCanvas,
  },
  data() {
    return {
      options: {
        cellSize: 8,
        data: 'hello, world',
      },
    };
  },
});
