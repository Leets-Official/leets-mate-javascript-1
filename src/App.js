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
    MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분)");
    const userInput = await MyUtils.Console.readLineAsync();

    if (!userInput.match(/^[\s가-힣,]+$/)) {
      throw new Error("이름은 한글로 입력해야 합니다.");
    }

    if (userInput.trim().endsWith(",")) {
      throw new Error("이름은 ','로 끝나면 안 됩니다.");
    }

    return userInput.split(",").map((name) => name.trim());
  }

  async getMaxPairs() {
    MyUtils.Console.print("최대 짝 수를 입력해주세요.");
    const userInput = await MyUtils.Console.readLineAsync();

    if (!userInput.match(/^[0-9]+$/)) {
      throw new Error("숫자만 입력해주세요");
    }
    return parseInt(userInput, 10);
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

module.exports = App;
