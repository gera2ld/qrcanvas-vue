const Vue = require('vue');
const Qrcanvas = require('jsqrgen-vue');

const options = {
  data: 'Hello world',
};

new Vue({
  el: 'body',
  data: {
    options,
  },
  components: {
    Qrcanvas,
  },
});
