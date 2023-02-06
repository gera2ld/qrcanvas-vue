const { defineComponent, ref, computed } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = defineComponent({
  components: {
    QRCanvas,
  },
  setup() {
    const text = ref('hello, world');
    const options = computed(() => ({
      resize: false,
      data: text.value,
    }));
    return {
      text,
      options,
      onUpdated(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 200, 200, 30);
        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillStyle = 'dodgerblue';
        ctx.fillText(text.value, 100, 220);
      },
    };
  },
});
