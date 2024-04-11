const MyUtils = require("../Utils/MyUtils");
let name=[];
let maxPairs=0;
let shuffledName=[];
let pair=[];
let check='y';
class App {
  async play() {
    try {
      MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");
      
      //사용자에게 이름 받기
      name = await this.getInputNames();
      //사용자에게 최대 짝 수 받기
      maxPairs = await this.getMaxPairs(name);
      //셔플
      await this.shuffle(name); 

      //결과 출력
      this.printResult(pair);
      
      //pair 재구성
      do{
        MyUtils.Console.print("다시 구성하시겠습니까? (y/n) :");
        check = await MyUtils.Console.readLineAsync(); 
        if(check=='y'){
          MyUtils.Console.print("--------------------------------");
          this.shuffle(name); 
          this.printResult(pair); 
        }
      } while(check =='y');
      
      MyUtils.Console.print("자리를 이동해 서로에게 인사해주세요.");
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
    return pair;
  }
  
  async getInputNames() {
    //한글 패턴
    const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
    let nameArray=[];
    try {
      MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분)");
  
      // 이름 입력
      const userName = await MyUtils.Console.readLineAsync();      
      // 입력된 이름 , 로 나눠주고 공백 제거하기
      nameArray = userName.split(',').map(name => name.trim());
      // 입력된 이름 중 한글이 아닌 경우 에러 발생
      nameArray.forEach(name => {
        if (!kor.test(name)) {
          throw new Error("이름은 한글로 입력해야 합니다.");
        }
      });
        
    } catch (error) {
      // reject 되는 경우
      throw new Error(`[ERROR] ${error.message}`);
    }
    return nameArray;
  }

  async getMaxPairs(nameArray) {
    try {
        MyUtils.Console.print("최대 짝 수를 입력해주세요.");
        const maxPairs = await MyUtils.Console.readLineAsync();

        // 입력 받은 멤버의 수 보다 많을 경우 다시 입력 받기
        if (parseInt(maxPairs) > nameArray.length) {
            throw new Error("최대 짝 수는 이름의 갯수보다 클 수 없습니다.");
        }
        return maxPairs; 
    } catch (error) {
        // reject 되는 경우
        throw new Error(`[ERROR] ${error.message}`);
    }
}

  createPairs(names, maxPairs) {
    let pairs = [];
    
    //원본 배열에 문제 없도록 복사해서 사용
    let namesCopy = [...names];
    for (let i = 0; i < namesCopy.length; i += parseInt(maxPairs)) {
      pairs.push(namesCopy.slice(i, i + parseInt(maxPairs)));
    }
    return pairs;
  }
  

  shuffle(array) {
    let shuffledArray = array.slice();
    shuffledName = shuffledArray.sort(() => Math.random() - 0.5);
    pair = this.createPairs(shuffledName,maxPairs);
}


printResult(pairs) {
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    pairs.forEach(pair => {
      const formattedPair = pair.join(' | '); 
      MyUtils.Console.print(`[ ${formattedPair} ]`);
  });
    MyUtils.Console.print("추천을 완료 했습니다.");
    return;
  }
}


module.exports = App;

new App().play();
