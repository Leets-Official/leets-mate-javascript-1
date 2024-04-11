const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {

    try {
      
      const nameInput = await this.getInputNames();
      const names = nameInput.split(',').map(name=>name.trim());


      const Korean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(nameInput); 
      if (!Korean) {
        throw new Error(`[ERROR] ${errormessage} : 이름은 한글로 입력해야 합니다.`)
      }

      
      const MaxPairsInput = await this.getMaxPairs();
      const MaxPairs = MyUtils.Console.realLineAsync(); //??

      if ( result.length < MaxParis) {
        throw new Error(`[ERROR] ${errormessage} : 최대 짝 수는 이름의 갯수보다 클 수 없습니다.`)
      }
      
      MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
      const pairs = this.createPairs(names, maxPairs);
      this.printResult(pairs);
      
      MyUtils.Console.print("\n추천을 완료했습니다.\n");

      while (true) {
      const again = MyUtils.Console.print("다시 구성하시겠습니까? (y or n): n\n");
      const answer = MyUtils.Console.realLineAsync();
      if (answer == y) {
        MyUtils.Console.print("------------------------------");
        const pairs = this.createPairs(names, maxPairs);
        this.printResult(pairs);
      }
      else {
        MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
        break;
      }
    }

    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getInputNames() {
    const NamesInput = MyUtils.Console.print("\[Leets 오늘의 짝에게]를 시작합니다.\n\n멤버의 이름을 입력해 주세요. (,로 구분)\n")
    return MyUtils.Console.realLineAsync();
  }

  async getMaxPairs() {
    const MaxParisInput = MyUtils.Console.print("최대 짝 수를 입력해 주세요.");
    return MyUtils.Console.realLineAsync();
  }

  createPairs(names, maxPairs) {
    const pairs = [];
    for (let i=0; i<MaxPairs; i++) {
      pairs.push([names[i*2], names[i*2+1]]);
    }
    return pairs;
  }

  shuffle(array) {
    for (let i = array.length-1; i>0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  printResult(pairs) {
    for (const pair of pairs) {
      console.log(`[ ${pair.join(' | ')} ]`);
    }
  }

  
}

module.exports = App;

new App().play();
