const { QRCanvas } = require('qrcanvas-vue');

module.exports = {
  components: {
    QRCanvas,
  },
  data() {
    return {
      options: {
        cellSize: 8,
        correctLevel: 'H',
        data: 'hello, world',
      },
    };
  },
  mounted() {
    const image = new Image();
    image.src = 'https://user-images.githubusercontent.com/3139113/38300650-ed2c25c4-382f-11e8-9792-d46987eb17d1.png';
    image.onload = () => {
      this.options = {
        ...this.options,
        logo: {
          image,
        },
      };
    };
  },
};
