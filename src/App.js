const MyUtils = require("../Utils/MyUtils");
const { getInputNames, getMaxPairs } = require("../Utils/UiUtils");
const { generatePairsAndPrint } = require("../Utils/PairingUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      const names = await getInputNames();
      const maxPairs = await getMaxPairs();
      const result = await generatePairsAndPrint(names, maxPairs);
      MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
      return result;
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }
}

module.exports = App;
