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
    if (maxPairs > names.length) {
      throw new Error("최대 짝 수는 이름의 갯수보다 클 수 없습니다.");
    }

    const pairs = [];
    const shuffledNames = this.shuffle(names);

    while (shuffledNames.length >= 2) {
      pairs.push(shuffledNames.splice(0, maxPairs));
    }

    if (shuffledNames.length === 1) {
      pairs.push([shuffledNames[0]]);
    }

    return pairs;
  }

  shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  printResult(pairs) {
    if (pairs.length === 0) {
      MyUtils.Console.print("짝을 만들 수 없습니다.");
      return;
    }
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    pairs.forEach((pair) => {
      MyUtils.Console.print(`[ ${pair.join(" | ")} ]`);
    });
    MyUtils.Console.print("추천을 완료했습니다.");
  }
}

module.exports = App;
