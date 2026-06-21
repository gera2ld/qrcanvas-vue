const { defineComponent, ref, computed } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = defineComponent({
  components: {
    QRCanvas,
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
