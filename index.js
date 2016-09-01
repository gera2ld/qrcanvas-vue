const qrgen = require('jsqrgen');
const Vue = require('vue');

const QRCanvas = {
  props: {
    options: Object,
  },
  template: '<canvas v-el:c></canvas>',
  methods: {
    render(options) {
      const canvas = this.$els.c;
      qrgen.canvas(Object.assign({}, options, {
        reuseCanvas: canvas,
      }));
    },
  },
  watch: {
    options: 'render',
  },
  ready() {
    this.render(this.options);
  },
};

module.exports = Vue.extend(QRCanvas);
