const MyUtils = require("../Utils/MyUtils");

let names = [];
let input, length;
let checkRetry = 'y';

class App {
  async play() {
    
    MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
        
    try {
        MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분)");
        names = await this.getInputNames();

        MyUtils.Console.print("최대 짝 수를 입력해주세요.");
        const maxPairs = await this.getMaxPairs();

        while (checkRetry === 'y') {

          names = this.shuffle(names);
          
          MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
          this.printResult(this.createPairs(names, maxPairs));

          MyUtils.Console.print("다시 구성하시겠습니까? (y or n): ");
          checkRetry = await MyUtils.Console.readLineAsync();

          if(checkRetry === 'y'){
            MyUtils.Console.print("--------------------------------");
          }
      }

      if(checkRetry === 'n' && length > 1){
        MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
      }

    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async getInputNames() {
    input = await MyUtils.Console.readLineAsync();

    var checkNum = /[0-9]/;
    var checkEng = /[a-zA-Z]/;
    var checkMore = /[~!@#\$%<>^&*]/;

    if (checkEng.test(input) || checkNum.test(input) || checkMore.test(input)) {
      throw new Error(`이름은 한글로 입력해야 합니다.`);
    }

    const arr = input.split(",");
    length = arr.length;
    return arr;
  }

  async getMaxPairs() {
    input = await MyUtils.Console.readLineAsync();
    if (input > length) {
      throw new Error(`최대 짝 수는 이름의 갯수보다 클 수 없습니다.`);
    }
    return input;
  }

  createPairs(names, maxPairs) {
    const pairs = [];
    let newGroup = [];

    names.forEach(name => {
      newGroup.push(name);
      if (newGroup.length === parseInt(maxPairs)) {
        pairs.push(newGroup.slice());
        newGroup = [];
      }
    });

    if (newGroup.length > 0) {
      pairs.push(newGroup);
    }

    return pairs;
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  printResult(pairs) {
    pairs.forEach(pair => {
    const formattedPair = pair.join(' | ');
    console.log(`[ ${formattedPair} ]`);
    });
  }
}

module.exports = App;

new App().play();