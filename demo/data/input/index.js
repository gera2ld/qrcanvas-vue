const { createApp, ref, computed } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = createApp({
  components: {
    qrcanvas: QRCanvas,
  },
  setup() {
    const text = ref('hello, world');
    const options = computed(() => ({
      cellSize: 8,
      data: text.value,
    }));
    return {
      text,
      options,
    };
  },
});
