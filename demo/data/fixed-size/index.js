const { QRCanvas } = require('qrcanvas-vue');

new Vue({
  components: {
    QrCanvas: QRCanvas,
  },
  data: {
    text: 'hello, world',
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
      ctx.fillText('hello, world', 100, 220);
    },
  },
})
.$mount(root);
