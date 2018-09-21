import { qrcanvas } from 'qrcanvas';

export default {
  props: ['options'],
  render: h => h('canvas'),
  methods: {
    update(options) {
      // Render only if mounted, skip SSR.
      if (!this.mounted) return;
      const qroptions = {
        ...options,
        canvas: this.$el,
      };
      qrcanvas(qroptions);
    },
  },
  watch: {
    options: 'update',
  },
  mounted() {
    this.mounted = true;
    this.update(this.options);
  },
};
