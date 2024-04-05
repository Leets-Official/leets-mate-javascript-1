const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      await this.getInputNames();
      await this.getMaxPairs();
      this.shuffle();
      this.createPairs();
      return ;
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async getInputNames() {
    try {
      MyUtils.Console.print("\n멤버의 이름을 입력해 주세요. (, 로 구분)");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      MyUtils.setUserInputArray(MyUtils.userInput.split(','));
      return;
    } catch (error) {
      throw error
    }
    
  }

  async getMaxPairs() {
    try {
      MyUtils.Console.print("\n최대 짝 수를 입력해 주세요.");
      MyUtils.setMaxPairs(await MyUtils.Console.readLineAsync());
      if (MyUtils.maxPairs > MyUtils.userInputArray.length) throw Error(`[ERROR] 최대 짝 수는 이름의 갯수보다 클 수 없습니다.`);
      return;
    } catch (error) {
      throw error
    }
  }

  shuffle() {
    MyUtils.userInputArray.sort(() => Math.random() - 0.5);
    return;
  }

  createPairs() {
    const result = [];
    console.log(MyUtils.maxPairs);
    for (let i = 0; i < MyUtils.userInputArray.length; i += MyUtils.maxPairs) {
      result.push(MyUtils.userInputArray.slice(i, i + MyUtils.maxPairs));
    }
    console.log(result);
  }

  printResult(pairs) {
    return;
  }
}


module.exports = App;

new App().play();
