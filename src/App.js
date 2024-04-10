const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
        MyUtils.Console.print("[Leets 오늘의 짝에게]를 시작합니다.");

        let continueDrawing = true;

        while (continueDrawing) {
            const names = await this.getInputNames();
            const maxPairs = await this.getMaxPairs(names.length);
            const pairs = this.createPairs(names, maxPairs);

            this.printResult(pairs);

            continueDrawing = await this.askForRedraw();
        }

        MyUtils.Console.print('자리를 이동해 서로에게 인사해주세요.');
      } catch (error) {
        MyUtils.Console.print(`[ERROR] ${error.message}`);
        }
  }

  async askForRedraw() {
      MyUtils.Console.print('\n추첨을 완료했습니다. \n다시 구성하시겠습니까? (y or n): ');
      const answer = await MyUtils.Console.readLineAsync();
      return answer.toLowerCase() === 'y';
  }

  async getInputNames() {
    MyUtils.Console.print("참석자들의 이름을 입력해 주세요. (, 로 구분)\n");
    const membersInput = await MyUtils.Console.readLineAsync();
    const members = membersInput.split(',');

      for (const member of members) {
        
        const koreanRegex = /^[가-힣]+$/;
        if (!koreanRegex.test(member.trim())) {
            throw new Error("이름은 한글로 입력해야 합니다.");
        }
      }
  
    return members;
  }

  async getMaxPairs(memberCount) { 
    MyUtils.Console.print('최대 짝 수를 입력해 주세요.\n');
    const maxPairsInput = await MyUtils.Console.readLineAsync();
    const maxPairs = parseInt(maxPairsInput);

    if (maxPairs > memberCount) {
        throw new Error("최대 짝 수는 참석자 수보다 많을 수 없습니다.");
    }

    return maxPairs;
  } 


  createPairs(names, maxPairs) {
    
    let pairedMembers = [];
    
    const totalGroups = Math.floor(names.length / maxPairs) + (names.length % maxPairs > 0 ? 1 : 0);

    pairedMembers.push([]);

    for (let i = 0; i < totalGroups; i++) {
  
        let group = [];
        const groupSize = Math.min(maxPairs, names.length);

        for (let j = 0; j < groupSize; j++) {

            if (names.length > 0) {
                group.push(names.shift());
            }
        }
        pairedMembers.push(group);
    }

    pairedMembers.shift();

    return pairedMembers;
  }

  printResult(pairs) {
    MyUtils.Console.print('오늘의 짝 추천 결과입니다.');

    for (let i = 0; i < pairs.length; i++) {
        let groupMembers = pairs[i];
        let groupString = '[';

        for (let j = 0; j < groupMembers.length; j++) {
          groupString += `${groupMembers[j]}`;
          
            if (j < groupMembers.length - 1) {
              groupString += ' | ';
           } 
        } 

      groupString += ']';
      MyUtils.Console.print(groupString);
    }
  }

}

module.exports = App;

new App().play();