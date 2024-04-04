const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");

      return result;
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async getInputNames() {
    return;
  }

  async getMaxPairs() {
    return;
  }

  createPairs(names, maxPairs) {
    return;
  }

  shuffle(array) {
    return;
  }

  printResult(pairs) {
    return;
  }
}

export default App;

module.exports = App;

new App().play();
