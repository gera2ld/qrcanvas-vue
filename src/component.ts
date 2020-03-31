import { qrcanvas, QRCanvasOptions } from 'qrcanvas';

export const Component = {
  props: {
    options: Object as () => QRCanvasOptions,
  },
  render: h => h('canvas'),
  methods: {
    update(options: QRCanvasOptions): void {
      // Render only if mounted, skip SSR.
      if (!this.mounted) return;
      this.$emit('beforeUpdate', this.$el);
      options = {
        ...options,
        canvas: this.$el,
      };
      if (!options.cellSize && !options.size) options.cellSize = 6;
      qrcanvas(options);
      this.$emit('updated', this.$el);
    },
  },
  watch: {
    options: 'update',
  },
  mounted(): void {
    this.mounted = true;
    this.update(this.options);
  },
};
