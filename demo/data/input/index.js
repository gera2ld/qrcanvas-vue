const Vue = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = new Vue({
  components: {
    qrcanvas: QRCanvas,
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
});
