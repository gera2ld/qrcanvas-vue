qrcanvas-vue
===

![NPM](https://img.shields.io/npm/v/qrcanvas-vue.svg)
![License](https://img.shields.io/npm/l/qrcanvas-vue.svg)
![Downloads](https://img.shields.io/npm/dt/qrcanvas-vue.svg)

This a QRCode component for use with Vue.js, based on [qrcanvas](https://github.com/gera2ld/qrcanvas).

Usage
---

```html
<qrcanvas :options="options"></qrcanvas>
```

1. With bundlers:

    ``` sh
    # Installation
    $ npm i qrcanvas-vue
    ```

    ```js
    import Qrcanvas from 'qrcanvas-vue';
    ```

2. In browser:

    ```html
    <script src="https://unpkg.com/qrcanvas/lib/qrcanvas.min.js"></script>
    <script src="https://unpkg.com/qrcanvas-vue/lib/qrcanvas-vue.min.js"></script>
    ```

    ```js
    const Qrcanvas = qrcanvas.vue;
    ```

---

* `options` is passed to [qrcanvas](https://github.com/gera2ld/qrcanvas). For more details, see [qrcanvas docs](https://github.com/gera2ld/qrcanvas/wiki).

* Be sure to pass a new `options` object if data is updated:

  ```js
  this.options = Object.assign({}, this.options, {
    data: 'new data',
  });
  ```

See [more examples](https://gera2ld.github.io/qrcanvas-vue/).
