qrcanvas-vue
===

![NPM](https://img.shields.io/npm/v/qrcanvas-vue.svg)
![License](https://img.shields.io/npm/l/qrcanvas-vue.svg)
![Downloads](https://img.shields.io/npm/dt/qrcanvas-vue.svg)

This a QRCode component for use with Vue.js, based on [qrcanvas](https://github.com/gera2ld/qrcanvas).

Install
---

``` sh
$ npm i qrcanvas-vue
```

Usage
---

``` html
<qrcanvas :options="options"></qrcanvas>
```

``` javascript
import Qrcanvas from 'qrcanvas-vue';

// Qrcanvas is a component with only one props: `options`
```

* `options` is passed to [qrcanvas](https://github.com/gera2ld/qrcanvas). For more details, see [qrcanvas docs](https://github.com/gera2ld/qrcanvas/wiki).

* Be sure to pass a new `options` object if data is updated:

  ``` javascript
  this.options = Object.assign({}, this.options, {
    data: 'new data',
  });
  ```

See [more examples](https://gera2ld.github.io/qrcanvas-vue/).
