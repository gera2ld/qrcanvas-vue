import { qrcanvas, QRCanvasOptions } from 'qrcanvas';

export const Component = {
  props: {
    options: Object as () => QRCanvasOptions,
  },
  render(h) {
    const { options, ...rest } = this.$props;
    return h('canvas', rest);
  },
  methods: {
    update(options: QRCanvasOptions): void {
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
    width: 'update',
    height: 'update',
  },
  mounted(): void {
    this.mounted = true;
    this.update(this.options);
  },
};
