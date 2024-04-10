const { printResult, promptForInput } = require("../Utils/UiUtils");

const shuffle = async (array) => {
  if (array instanceof Array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
};

const createPairs = async (names, maxPairs) => {
  if (Array.isArray(names) && typeof maxPairs === "number") {
    if (maxPairs > names.length) {
      throw new Error("최대 짝 수는 이름의 갯수보다 클 수 없습니다.");
    }

    const pairs = [];
    const shuffledNames = await shuffle(names);

    while (shuffledNames.length >= 2) {
      pairs.push(shuffledNames.splice(0, maxPairs));
    }

    if (shuffledNames.length === 1) {
      pairs.push([shuffledNames[0]]);
    }

    return pairs;
  }
};

const generatePairsAndPrint = async (names, maxPairs) => {
  if (Array.isArray(names) && typeof maxPairs === "number") {
    const result = [];
    let continuePrompt = "y";

    while (continuePrompt.toLowerCase() === "y") {
      const pairs = await createPairs(names, maxPairs);
      printResult(pairs);
      result.push(...pairs);
      continuePrompt = await promptForInput(
        "다시 구성하시겠습니까? (y or n):",
        "y",
        "n"
      );
    }

    return result;
  }
};

module.exports = {
  generatePairsAndPrint,
  createPairs,
  shuffle,
};
