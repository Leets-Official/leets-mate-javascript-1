const Mather = require('./Matcher');

class App {
  async play() {
    const matcher = new Mather();
    await matcher.match();
  }
}

module.exports = App;

new App().play();
