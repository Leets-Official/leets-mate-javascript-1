const MyUtils = require("./MyUtils");

const validateNameInput = (userInput) => {
  if (!userInput.match(/^[\sㄱ-ㅎㅏ-ㅣ가-힣,\+]+$/)) {
    throw new Error("이름은 한글로 입력해야 합니다.");
  }
  if (!userInput.match(/^[\s가-힣,]+$/)) {
    throw new Error("완전한 한 음절이어야 합니다.");
  }
  if (userInput.trim().endsWith(",")) {
    throw new Error("입력은 ','로 끝날 수 없습니다.");
  }

  const namesArray = userInput.split(",").map((names) => names.trim());
  if (namesArray.some((names) => names.includes(" "))) {
    throw new Error("이름에 공백이 포함되어 있을 수 없습니다.");
  }

  if (namesArray.some((names) => names.length > 6)) {
    throw new Error("이름은 6글자 이하로 입력해야 합니다.");
  }

  return namesArray;
};

const validateNumberInput = (userInput) => {
  if (!userInput.match(/^[0-9]+$/)) {
    throw new Error("숫자만 입력해주세요");
  }

  return parseInt(userInput, 10);
};

module.exports = {
  validateNameInput,
  validateNumberInput,
};
