const { defineComponent } = require('vue');
const { QRCanvas } = require('qrcanvas-vue');

module.exports = defineComponent({
  components: {
    QRCanvas,
  },
  setup() {
    const fg = document.createElement('canvas');
    fg.width = 100;
    fg.height = 100;
    const ctx = fg.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, fg.width, 0);
    gradient.addColorStop(0, '#f00');
    gradient.addColorStop(1, '#0f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, fg.width, fg.height);

    const options = {
      cellSize: 8,
      correctLevel: 'H',
      data: 'hello, world',
      foreground: fg,
    };

    return { options };
  },
});
