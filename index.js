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
      // Render only if mounted, skip SSR.
      if (!this.mounted) return;
      var qroptions = {};
      options && Object.keys(options).forEach(function (key) { qroptions[key] = options[key]; });
      qroptions.reuseCanvas = this.$el;
      qrcanvas(qroptions);
    },
  },
  watch: {
    options: 'render',
  },
  mounted: function () {
    this.mounted = true;
    this.render(this.options);
  },
};

module.exports = QRCanvas;
