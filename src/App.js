const MyUtils = require("../Utils/MyUtils");

let shuffledName = [];
let pair = [];

class App {
  async play() {
    try {
        MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");

        let continueDrawing = true; //y입력하면 반복하기위한 변수

        const names = await this.getInputNames();
        const maxPairs = await this.getMaxPairs(names.length);
        let result = [];
        while (continueDrawing) {
          if (result.length !== 0) {
            MyUtils.Console.print("--------------------------------");
          }
          const pairs = this.shuffle(names, maxPairs);
          result = pairs

            this.printResult(pairs);

            continueDrawing = await this.askForRedraw(); //다시 추첨할 지 물어봄
        }

        MyUtils.Console.print('자리를 이동해 서로에게 인사해주세요.');
        return result;
      } catch (error) {
        throw new Error(`[ERROR] ${error.message}`);
        }
  }

  async askForRedraw() { //다시 추첨할 지 물어보는 함수
      MyUtils.Console.print('다시 구성하시겠습니까? (y or n): ');
      const answer = await MyUtils.Console.readLineAsync();
      return answer.toLowerCase() === 'y'; // 사용자가 y를 입력하면 true를 반환
  }

  async getInputNames() {
    MyUtils.Console.print("멤버의 이름을 입력해주세요. (, 로 구분)");
    const membersInput = await MyUtils.Console.readLineAsync();
    const members = membersInput.split(','); //쉼표로 구분하여 배열로 분리함  

      //한글을 입력하지 않으면 에러 출력
      for (const member of members) { //각 이름에 대해 반복
        
        const koreanRegex = /^[가-힣]+$/; //한글만 포함하는 문자열
        if (!koreanRegex.test(member.trim())) {
            throw new Error("이름은 한글로 입력해야 합니다."); //공백 제거한 문자열에서 한글만 있지 않으면 실행
        }
      }
  
    return members;
  }

  async getMaxPairs(memberCount) { 
    MyUtils.Console.print('최대 짝 수를 입력해주세요.');
    const maxPairsInput = await MyUtils.Console.readLineAsync();
    const maxPairs = parseInt(maxPairsInput); //입력 값(문자열)을 정수로 변환

    if (maxPairs > memberCount) {
        throw new Error("최대 짝 수는 참석자 수보다 많을 수 없습니다.");
    }

    return maxPairs;
  } 

  shuffle(array, maxPairs) {
    let shuffledArray = array.slice();
    shuffledName = shuffledArray.sort(() => Math.random() - 0.5);
    return this.createPairs(shuffledName, maxPairs); // 수정된 부분: createPairs의 반환값을 반환하도록 수정
}

createPairs(names, maxPairs) {
    let pairedMembers = []; // 페어를 저장할 빈 배열

    while (names.length > 0) { // names에 이름이 남아있지 않을 때까지 반복
        let group = []; // 새로운 그룹 생성
        for (let j = 0; j < maxPairs && names.length > 0; j++) {
            group.push(names.shift()); // 이름을 그룹에 추가
        }
        pairedMembers.push(group); // 그룹을 페어 배열에 추가
    }

    return pairedMembers;
}


  
  printResult(pairs) { //pairs = 페어가 저장된 배열
    MyUtils.Console.print('오늘의 짝 추천 결과입니다.');
    let groupString = ""

    if (pairs.length > 1) {
      for (let i = 0; i < pairs.length; i++) { //각 그룹에 대해서 반복
        let groupMembers = pairs[i]; // 현재 짝 그룹을 groupMembers 변수에 할당
        groupString = '[ '; //짝 그룹 담을 빈 문자열 groupSrting 생성

        for (let j = 0; j < groupMembers.length; j++) { //그룹의 각 멤버를 groupString에 담음
          groupString += `${groupMembers[j]}`;
          
            if (j < groupMembers.length - 1) { //현재 멤버가 그룹의 마지막 멤버가 아니라면 |추가
              groupString += ' | ';
           } 
        } 

      groupString += ' ]';
    }
      MyUtils.Console.print(groupString);
    } else {
      MyUtils.Console.print(`[ ${pairs[0]} ]`);
    }
  }

}

module.exports = App;

new App().play();

