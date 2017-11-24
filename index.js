var QRCanvas = {
  props: ['options'],
  render: function (createElement) {
    return createElement('canvas');
  },
  methods: {
    update: function (options) {
      // Render only if mounted, skip SSR.
      if (!this.mounted) return;
      var qroptions = {};
      if (options) Object.keys(options).forEach(function (key) { qroptions[key] = options[key]; });
      qroptions.reuseCanvas = this.$el;
      var qrcanvas = require('qrcanvas');
      qrcanvas(qroptions);
    },
  },
  watch: {
    options: 'update',
  },
  mounted: function () {
    this.mounted = true;
    this.update(this.options);
  },
};

module.exports = QRCanvas;
