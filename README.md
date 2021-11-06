# qrcanvas-vue

![NPM](https://img.shields.io/npm/v/qrcanvas-vue.svg)
![License](https://img.shields.io/npm/l/qrcanvas-vue.svg)
![Downloads](https://img.shields.io/npm/dt/qrcanvas-vue.svg)

This a QRCode component for use with Vue.js, based on [qrcanvas](https://github.com/gera2ld/qrcanvas).

## Usage

1. With bundlers:

    ``` sh
    # Installation
    $ npm i vue qrcanvas-vue
    ```

    ```vue
    <template>
      <QRCanvas :options="options" @updated="onUpdated" />
    </template>

    <script>
    import { QRCanvas } from 'qrcanvas-vue';

    export default {
      components: {
        QRCanvas,
      },
      data() {
        return {
          options: {
            data: 'hello',
          },
        };
      },
      methods: {
        onUpdated() {
          console.log('updated');
        },
      },
    };
    </script>
    ```

2. In browser:

    ```html
    <script src="https://cdn.jsdelivr.net/combine/npm/qrcanvas@3,npm/qrcanvas-vue@2"></script>
    <div id="root">
      <qr-canvas :options="options" @updated="onUpdated"></qr-canvas>
    </div>
    ```

    ```js
    const { QRCanvas: QrCanvas } = qrcanvas.vue;

    new Vue({
      components: {
        QrCanvas, // QrCanvas <-> qr-canvas
      },
      data: {
        options: {
          data: 'hello',
        },
      },
      methods: {
        onUpdated() {
          console.log('updated');
        },
      },
    })
    .$mount('#root');
    ```

### Props

* `options` is passed to [qrcanvas](https://github.com/gera2ld/qrcanvas). For more details, see [qrcanvas docs](https://github.com/gera2ld/qrcanvas/wiki).

* Be sure to pass a new `options` object if data is updated:

    ```js
    this.options = Object.assign({}, this.options, {
      data: 'new data',
    });
    ```

### Events

- `beforeUpdate`

    Fired before the canvas is updated. The only parameter is the canvas.

- `updated`

    Fired after the canvas is updated. The only parameter is the canvas.

See [more examples](https://gera2ld.github.io/qrcanvas-vue/).
