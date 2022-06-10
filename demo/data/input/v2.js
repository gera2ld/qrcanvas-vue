const { QRCanvas } = require('qrcanvas-vue');

module.exports = {
  components: {
    QRCanvas,
  },
  data() {
    return {
      text: 'hello, world',
    };
  },
  computed: {
    options() {
      return {
        cellSize: 8,
        data: this.text,
      };
    },
  },
};
