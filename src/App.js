const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      const names = await this.getInputNames();
      const maxPairs = await this.getMaxPairs();
      const result = await this.generatePairsAndPrint(names, maxPairs);
      MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
      return result;
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async getInputNames() {
    const userInput = await this.promptForInput(
      "멤버의 이름을 입력해주세요. (, 로 구분)"
    );
    this.validateNames(userInput);
    return userInput.split(",").map((name) => name.trim());
  }

  async getMaxPairs() {
    const userInput = await this.promptForInput("최대 짝 수를 입력해주세요.");
    this.validateNumber(userInput);
    return parseInt(userInput, 10);
  }

  async generatePairsAndPrint(names, maxPairs) {
    const result = [];
    let continuePrompt = "y";

    while (continuePrompt.toLowerCase() === "y") {
      const pairs = this.createPairs(names, maxPairs);
      this.printResult(pairs);
      result.push(...pairs);
      continuePrompt = await this.promptForInput(
        "다시 구성하시겠습니까? (y or n):",
        "y",
        "n"
      );
    }

    return result;
  }

  async promptForInput(message, ...validOptions) {
    MyUtils.Console.print(message);
    const userInput = await MyUtils.Console.readLineAsync();

    if (
      validOptions.length &&
      !validOptions.includes(userInput.toLowerCase())
    ) {
      throw new Error("잘못된 입력입니다. 다시 입력해주세요.");
    }

    return userInput;
  }

  validateNames(userInput) {
    const names = userInput.split(",").map((name) => name.trim());
    if (names.some((name) => name.includes(" "))) {
      throw new Error("이름에 공백이 포함되어 있을 수 없습니다.");
    }

    if (!userInput.match(/^[\sㄱ-ㅎㅏ-ㅣ가-힣,\+]+$/)) {
      throw new Error("이름은 한글로 입력해야 합니다.");
    }

    if (!userInput.match(/^[\s가-힣,]+$/)) {
      throw new Error("완전한 한 음절이어야 합니다.");
    }

    if (userInput.trim().endsWith(",")) {
      throw new Error("입력은 ','로 끝날 수 없습니다.");
    }
  }

  validateNumber(userInput) {
    if (!userInput.match(/^[0-9]+$/)) {
      throw new Error("숫자만 입력해주세요");
    }
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
