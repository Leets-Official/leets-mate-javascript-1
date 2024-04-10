const App = require("../src/App");
const MyUtils = require("../Utils/MyUtils");

describe("오늘의 짝꿍은?", () => {
  beforeEach(() => {
    MyUtils.setUserInput("");
  });

  const mockInput = async (inputs) => {
    const inputSpy = jest.spyOn(MyUtils.Console, "readLineAsync");
    for (const input of inputs) {
      inputSpy.mockResolvedValueOnce(input);
    }
    return inputSpy;
  };

  const mockOutput = () => {
    const outputSpy = jest.spyOn(MyUtils.Console, "print");
    outputSpy.mockClear();
    return outputSpy;
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("정상적인 입력일 때 올바른 결과가 출력되는지 확인", async () => {
    const outputSpy = mockOutput();

    const app = new App();
    const inputSpy = await mockInput([
      "김성민,조혜원,노정완,나아연,양태석",
      "3",
      "n",
    ]);

    await app.play();

    const expectedMessages = [
      "[Leets 오늘의 짝에게]를 시작합니다.",
      "멤버의 이름을 입력해주세요. (, 로 구분)",
      "최대 짝 수를 입력해주세요.",
      "오늘의 짝 추천 결과입니다.",
    ];

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("정상적인 입력 후 다시 구성 여부를 물어봤을 때, 다시 구성할 경우 결과가 출력되는지 확인", async () => {
    const outputSpy = mockOutput();

    const app = new App();
    const inputSpy = await mockInput([
      "김성민,조혜원,노정완,나아연,양태석",
      "3",
      "y",
      "n",
    ]);

    await app.play();

    const expectedMessages = [
      "[Leets 오늘의 짝에게]를 시작합니다.",
      "멤버의 이름을 입력해주세요. (, 로 구분)",
      "최대 짝 수를 입력해주세요.",
      "오늘의 짝 추천 결과입니다.",
      "--------------------------------",
      "자리를 이동해 서로에게 인사해주세요.",
    ];

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("이름이 한글이 아닌 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput(["John,Doe"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 이름은 한글로 입력해야 합니다."
    );
    inputSpy.mockRestore();
  });

  test("최대 짝 수가 이름의 갯수보다 클 때 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput([
      "김성민,조혜원,노정완,나아연,양태석",
      "6",
    ]);

    await expect(app.play()).rejects.toThrow(
      `[ERROR] 최대 짝 수는 이름의 갯수보다 클 수 없습니다.`
    );
    inputSpy.mockRestore();
  });

  test("한 명의 이름이 입력되었을 때도 정상적으로 짝을 구성하는지 확인", async () => {
    const outputSpy = mockOutput();
    const app = new App();
    const inputSpy = await mockInput(["김성민", "1", "n"]);

    await app.play();

    const expectedMessages = [
      "[Leets 오늘의 짝에게]를 시작합니다.",
      "멤버의 이름을 입력해주세요. (, 로 구분)",
      "최대 짝 수를 입력해주세요.",
      "오늘의 짝 추천 결과입니다.",
      "[ 김성민 ]",
    ];

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });
    inputSpy.mockRestore();
  });

  test("입력된 이름이 중복되어 짝 지어지진 않았는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput(["김성민,조혜원,노정완", "3", "n"]);

    const result = await app.play();

    const flatResult = result.flat();
    const uniqueNames = new Set(flatResult);
    expect(uniqueNames.size).toBe(3);
    inputSpy.mockRestore();
  });

  test("결과 값이 최대 짝 수를 넘지 않는지 확인", async () => {
    const app = new App();
    const maxPairs = 2;
    const inputSpy = await mockInput(["김성민,조혜원,노정완", "2", "n"]);

    const result = await app.play();

    const allPairsValid = result.every((pari) => pari.length <= maxPairs);
    expect(allPairsValid).toBe(true);
    inputSpy.mockRestore();
  });

  test("실행할 때마다 결과 값이 다르게 생성되는지 확인", async () => {
    const app = new App();

    const results = [];
    for (let i = 0; i < 5; i++) {
      const inputSpy = await mockInput(["김성민,조혜원,노정완", "2", "n"]);
      const result = await app.play();
      results.push(result);
      inputSpy.mockRestore();
    }

    const uniqueResults = Array.from(new Set(results.map(JSON.stringify))).map(
      JSON.parse
    );
    expect(uniqueResults.length).toBeGreaterThan(1);
  });
});
