const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      await this.receive();
      while (true) {
        this.give();
        if (await this.replay() == 'n') {
          MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
          break;
        }
        MyUtils.Console.print("--------------------------------");
      }
      return MyUtils.result;
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async receive() {
    await this.getInputNames();
    await this.getMaxPairs();
  }

  give() {
    this.shuffle();
    this.createPairs();
    this.printResult();
  }

  async getInputNames() {
    try {
      MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분)");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      const hangulRange = /^[가-힣][가-힣,]+[^,]$/;
      if (!hangulRange.test(MyUtils.userInput)) {
        throw new Error("[ERROR] 이름은 한글로 입력해야 합니다.");
      }
      MyUtils.setUserInputArray(MyUtils.userInput.split(','));
      return;
    } catch (error) {
      throw error;
    }

  }

  async getMaxPairs() {
    try {
      MyUtils.Console.print("최대 짝 수를 입력해주세요.");
      MyUtils.setMaxPairs(await MyUtils.Console.readLineAsync());
      if (MyUtils.maxPairs > MyUtils.userInputArray.length) throw Error(`최대 짝 수는 이름의 갯수보다 클 수 없습니다.`);
      return;
    } catch (error) {
      throw error;
    }
  }

  shuffle() {
    MyUtils.userInputArray.sort(() => Math.random() - 0.5);
    return;
  }

  createPairs() {
    MyUtils.result = [];
    for (let i = 0; i < MyUtils.userInputArray.length; i += parseInt(MyUtils.maxPairs)) {
      MyUtils.result.push(MyUtils.userInputArray.slice(i, i + parseInt(MyUtils.maxPairs)));
    }
  }

  printResult() {
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    MyUtils.result.forEach(element => {
      MyUtils.Console.print("[ " + element.join(" | ") + " ]");
    });
    MyUtils.Console.print("추천을 완료했습니다.");
    return;
  }

  async replay() {
    MyUtils.Console.print("다시 구성하시겠습니까? (y or n): ");
    return await MyUtils.Console.readLineAsync();
  }
}


module.exports = App;

new App().play();
