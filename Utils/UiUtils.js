const MyUtils = require("./MyUtils");

const {
  validateNameInput,
  validateNumberInput,
} = require("../Utils/ValidationUtils");

const promptForInput = async (message, ...validOptions) => {
  MyUtils.Console.print(message);
  const userInput = await MyUtils.Console.readLineAsync();
  if (userInput.toLowerCase() === "y")
    MyUtils.Console.print("--------------------------------");

  if (validOptions.length && !validOptions.includes(userInput.toLowerCase())) {
    throw new Error("잘못된 입력입니다. 다시 입력해주세요.");
  }

  return userInput;
};

const getInputNames = async () => {
  const userInput = await promptForInput(
    "멤버의 이름을 입력해주세요. (, 로 구분)"
  );
  const names = await validateNameInput(userInput);
  return names;
};

const getMaxPairs = async () => {
  const userInput = await promptForInput("최대 짝 수를 입력해주세요.");
  return validateNumberInput(userInput);
};

const printResult = async (pairs) => {
  if (pairs instanceof Array) {
    if (pairs.length === 0) {
      MyUtils.Console.print("짝을 만들 수 없습니다.");
      return;
    }
    MyUtils.Console.print("오늘의 짝 추천 결과입니다.");
    pairs.forEach((pair) => {
      MyUtils.Console.print(`[ ${pair.join(" | ")} ]`);
    });
    MyUtils.Console.print("추천을 완료했습니다.");
  }
};

module.exports = {
  getInputNames,
  getMaxPairs,
  promptForInput,
  printResult,
};
