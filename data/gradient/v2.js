const { QRCanvas } = require('qrcanvas-vue');

module.exports = {
  components: {
    QRCanvas,
  },
  data() {
    return {
      options: {
        cellSize: 8,
        correctLevel: 'H',
        data: 'hello, world',
      },
    };
  },
  mounted() {
    const fg = document.createElement('canvas');
    fg.width = 100;
    fg.height = 100;
    const ctx = fg.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, fg.width, 0);
    gradient.addColorStop(0, '#f00');
    gradient.addColorStop(1, '#0f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, fg.width, fg.height);

    this.options = {
      ...this.options,
      foreground: fg,
    };
  },
};
