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
        resize: false,
        data: this.text,
      };
    },
  },
  methods: {
    onUpdated(canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 200, 200, 30);
      ctx.textAlign = 'center';
      ctx.font = '20px Arial';
      ctx.fillStyle = 'dodgerblue';
      ctx.fillText(this.text, 100, 220);
    },
  },
};
