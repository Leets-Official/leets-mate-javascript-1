const chainBoolean = require('../../Utils/chainBoolean.js');

class Validator {
  static isKorean(name) {
    const koreanReg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return koreanReg.test(name);
  }

  static isValidLength(name) {
    return name.length < 5;
  }

  static validateName(names) {
    const validate = chainBoolean(this.isKorean, this.isValidLength);
    const isValid = names.split(',').every(validate);

    if (!isValid) {
      throw new Error(
        '[ERROR] 각 이름의 글자는 5글자 이하의 한글이어야 합니다'
      );
    }
  }

  static validateMaxPairsCount(memberCount, maxPairsCount) {
    if (memberCount < maxPairsCount) {
      throw new Error('[ERROR] 최대 짝 수는 이름의 갯수보다 클 수 없습니다.');
    }
  }

  static validateRetry(answer) {
    const lowercaseAnswer = answer.toLowerCase();

    if (lowercaseAnswer !== 'y' && lowercaseAnswer !== 'n') {
      throw new Error('[ERROR] y 혹은 n을 입력해주세요.');
    }
  }
}

module.exports = Validator;
