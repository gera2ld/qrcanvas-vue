import { qrcanvas, QRCanvasOptions } from "qrcanvas";
import { defineComponent, h, PropType, ref, watchPostEffect } from "vue";

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
    const paint = () => {
      const options = {
        ...(props.options as QRCanvasOptions),
        canvas: canvas.value ?? undefined,
      } as QRCanvasOptions;
      if (!canvas.value) return;
      context.emit("beforeUpdate", canvas.value);
      qrcanvas(options);
      context.emit("updated", canvas.value);
    };
    watchPostEffect(paint);

    return () => {
      const { options, ...rest } = props;
      return h("canvas", { ...rest, ref: canvas });
    };
  },
});
