const { defineComponent } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = defineComponent({
  components: {
    qrcanvas: QRCanvas,
  },
  setup() {
    return {
      options: {
        cellSize: 8,
        data: 'hello, world',
        padding: 8,
      },
    };
  },
});
