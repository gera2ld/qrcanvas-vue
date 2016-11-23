var Vue = require('vue');
var qrcanvas = require('qrcanvas');

var QRCanvas = {
  props: {
    options: Object,
  },
  render: function (createElement) {
    return createElement('canvas');
  },
  methods: {
    render: function (options) {
      var qroptions = {};
      Object.keys(options).forEach(function (key) {qroptions[key] = options[key];});
      qroptions.reuseCanvas = this.$el;
      qrcanvas(qroptions);
    },
  },
  watch: {
    options: 'render',
  },
  mounted: function () {
    this.render(this.options);
  },
};

module.exports = Vue.extend(QRCanvas);
