const { QRCanvas } = require('qrcanvas-vue');

module.exports = {
  components: {
    QRCanvas,
  },
  data() {
    return {
      options: {
        cellSize: 8,
        data: 'hello, world',
        padding: 8,
      },
    };
  },
};
