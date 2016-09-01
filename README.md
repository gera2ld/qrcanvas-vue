jsqrgen-vue
===

![NPM](https://img.shields.io/npm/v/jsqrgen-vue.svg)
![Licence](https://img.shields.io/npm/l/jsqrgen-vue.svg)
![Downloads](https://img.shields.io/npm/dt/jsqrgen-vue.svg)

This a QRCode component for use with Vue.js, based on [jsqrgen](https://github.com/gera2ld/jsqrgen).

Install
---

``` sh
$ npm i jsqrgen-vue
```

Usage
---

``` html
<qrcanvas :options="options"></qrcanvas>
```

``` javascript
import Qrcanvas from 'jsqrgen-vue';

// Qrcanvas is a component with only one props: `options`
```

`options` is passed to [jsqrgen](https://github.com/gera2ld/jsqrgen). For more details, see [jsqrgen docs](https://github.com/gera2ld/jsqrgen/wiki).
