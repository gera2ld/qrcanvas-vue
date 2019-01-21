import { qrcanvas, QRCanvasOptions } from 'qrcanvas';

export const Component = {
  props: {
    options: Object as () => QRCanvasOptions,
  },
  render: h => h('canvas'),
  methods: {
    update(options: QRCanvasOptions) {
      // Render only if mounted, skip SSR.
      if (!this.mounted) return;
      this.$emit('beforeUpdate', this.$el);
      qrcanvas({
        ...options,
        canvas: this.$el,
      });
      this.$emit('updated', this.$el);
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
