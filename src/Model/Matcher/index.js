const OutputView = require('../../View/OutputView.js');
const InputView = require('../../View/InputView.js');
const Validator = require('../../Validator/index.js');
const Member = require('../Member');
const MemberFormatter = require('../Formatter');

class Matcher {
  #members;
  #maxPairs;

  constructor() {
    this.#members = [];
    this.#maxPairs = 0;
  }

  async match() {
    OutputView.print('[Leets 오늘의 짝에게]를 시작합니다.\n');
    this.#members = await this.readNames();
    this.#maxPairs = await this.readMaxPairs();

    await this.format();
  }

  async readNames() {
    const names = await InputView.read(
      '멤버의 이름을 입력해주세요. (, 로 구분)',
      (answer) => Validator.validateName(answer)
    );
    return names.split(',').map((name) => new Member(name));
  }

  async readMaxPairs() {
    const maxPairs = await InputView.read(
      '\n최대 짝 수를 입력해주세요.',
      (maxPairsCount) =>
        Validator.validateMaxPairsCount(this.#members.length, maxPairsCount)
    );
    return maxPairs;
  }

  async format() {
    const formattedMembers = new MemberFormatter(this.#members)
      .shuffle()
      .splitBy(this.#maxPairs)
      .formatString();

    this.printResult(formattedMembers);
    await this.askRetry();
  }

  printResult(formattedMembers) {
    OutputView.print('\n오늘의 짝 추천 결과입니다.');
    formattedMembers.forEach((foramttedMember) =>
      OutputView.print(foramttedMember)
    );
  }

  async askRetry() {
    OutputView.print('\n추천을 완료했습니다.');

    const retryAnswer = await InputView.read(
      '다시 구성하시겠습니까? (y or n): ',
      (answer) => Validator.validateRetry(answer)
    );

    if (retryAnswer === 'y') {
      OutputView.print('--------------------------------');
      return this.format();
    }

    OutputView.print('자리를 이동해 서로에게 인사해주세요.');
    return;
  }
}

module.exports = Matcher;
