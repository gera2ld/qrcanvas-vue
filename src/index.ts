import {
  PropType, defineComponent, h, ref, watchEffect, watch,
} from 'vue';
import { qrcanvas, QRCanvasOptions } from 'qrcanvas';

export const QRCanvas = defineComponent({
  props: {
    options: {
      type: Object as PropType<QRCanvasOptions>,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  setup(props, context) {
    const canvas = ref(null);
    const update = () => {
      const options = {
        ...props.options as QRCanvasOptions,
        canvas: canvas.value,
      } as QRCanvasOptions;
      if (!canvas.value) return;
      context.emit('beforeUpdate', canvas.value);
      qrcanvas(options);
      context.emit('updated', canvas.value);
    };
    watchEffect(update);
    watch(() => [props.width, props.height], update);

    return () => {
      const { options, ...rest } = props;
      return h('canvas', { ...rest, ref: canvas });
    };
  },
});
