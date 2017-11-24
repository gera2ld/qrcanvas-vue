const Qrcanvas = require('qrcanvas-vue');

const options = {
  data: 'Hello world',
};

new Vue({
  el: '#app',
  render: h => h(Qrcanvas, {
    props: {
      options,
    },
  }),
});
