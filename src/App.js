const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      const names = await this.getInputNames();
      const maxPairs = await this.getMaxPairs();

      const Pairs = await this.createPairs(names, maxPairs);
      this.printResult(Pairs);

      MyUtils.Console.print("추첨을 완료했습니다.");

      MyUtils.Console.print("다시 구성하시겠습니까? (y or n ) ");
      const retry = MyUtils.Console.readLineAsync();
      if (retry == "y") {
        // y 이면  ------------------- 출력 후 play() 다시 실행
        MyUtils.Console.print("======================================");
        this.play();
      } else if (retry == "n") {
        // n 이면 자리를 이동해 서로에게 인사해주세요. 출력 후 종료
        MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
      } else {
        // 예외 - y n 가 아닌 다른 문자 입력 시 " y 또는 n 를 입력해주세요 " 출력
        MyUtils.Console.print("잘못된 입력입니다.  y 또는 n 를 입력해주세요. ");
      }
    } catch (error) {
      // throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async getInputNames() {
    MyUtils.Console.print("멤버의 이름을 입력해주세요. ( , 로 구분):");
    const input = await MyUtils.Console.readLineAsync();
    const hangeulCheck = /^[\s가-힣,]+$/;
    if (input != hangeulCheck) {
      throw new error("[ERROR] 이름은 한글로 입력해야 합니다");
    }
    const names = input.split(",").map((name) => name.trim());
    return names;
  }

  async getMaxPairs() {
    MyUtils.Console.print("최대 짝수를 입력해주세요.");
    const maxPairs = await MyUtils.Console.readLineAsync();
    if (MyUtils.userInput.length < maxPairs) {
      throw new error("[ERROR] 최대 짝 수는 이름의 갯수보다 클 수 없습니다.");
    }
    // if(maxPairs){
    //   throw new error("숫자만 입력해주세요.")
    // }
    return;
  }

  createPairs(names, maxPairs) {
    const pairs = [];
    const shuffleNames = this.shuffle(names);

    for (let i = 0; i < maxPairs; i += maxPairs) {
      pairs.push(shuffleNames.slice(i, i + maxPairs));
    }
    return pairs;
  }

  shuffle(array) {
    return array.sort(() => Math.random - 0.5);
  }

  printResult(pairs) {
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    pairs.array.forEach((pair) => {
      MyUtils.Console.print(`[${pair.join(" | ")}]`);
    });
    return pairs;
  }
}

module.exports = App;

new App().play();
