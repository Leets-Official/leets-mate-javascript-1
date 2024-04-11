const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      
      const names = await this.getInputNames();
      const maxPairs = await this.getMaxPairs();
    

      do {
        const pairs = this.createPairs(names, maxPairs);

        this.printResult(pairs);
      
        MyUtils.Console.print("추천을 완료했습니다.");
        MyUtils.Console.print("다시 구성하시겠습니까? (y or n)");
  
        const again = await MyUtils.Console.readLineAsync();
      
        if (again !== 'y' && again !== 'n') {
          throw new Error(`[ERROR] ${error.message}`);
        }
        if (again.trim().toLowerCase() === 'n'){
          MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
          return;
        } 
        if (again.trim().toLowerCase() === 'y') {
          MyUtils.Console.print("--------------------------------");
          continue;
        } 
      } while (true)
      return pairs;
    }
    catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    } 

  }
   
  async returnAgian(){

  }

  async getInputNames() {
    MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분): ");
    const userInput = await MyUtils.Console.readLineAsync();
  
    const hangulRange = /^[가-힣][가-힣,]+[^,]$/;
    if (!hangulRange.test(userInput)) {
      throw new Error("[ERROR] 이름은 한글로 입력해야 합니다.");
    }
  
    return userInput.split(",").map(name => name.trim());
  }
  

  async getMaxPairs() {
    MyUtils.Console.print("최대 짝 수를 입력해주세요.: ");
    const maxPairs = await MyUtils.Console.readLineAsync();
    return parseInt(maxPairs);
  }

  createPairs(names, maxPairs) {
    if(maxPairs > names.length){
      throw new Error("최대 짝 수는 이름의 개수보다 클 수 없습니다.");
    }
    
    const shuffledNames = this.shuffle(names);
    const pairs = [];
    for(let i = 0; i < shuffledNames.length; i += maxPairs){
      pairs.push(shuffledNames.slice(i, i + maxPairs));
    }
    return pairs;
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  printResult(pairs) {
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    pairs.forEach(pair => {
      MyUtils.Console.print(`[ ${pair.join(" | ")} ]`);
    });
  }


}

module.exports = App;

new App().play();
