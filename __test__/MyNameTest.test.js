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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("이름에 자모음이 입력 될 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput(["김,ㅈ,노", "3", "n"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 완전한 한 음절이어야 합니다."
    );
    inputSpy.mockRestore();
  });

  test("입력이 ','로 끝나는 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput(["김성민,조혜원,노정완,", "3", "n"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 입력은 ','로 끝날 수 없습니다."
    );
    inputSpy.mockRestore();
  });

  test("이름에 공백이 입력 될 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput(["김성 민,조혜원,노정완", "3", "n"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 이름에 공백이 포함되어 있을 수 없습니다."
    );
    inputSpy.mockRestore();
  });

  test("이름의 길이가 6이 넘을 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    const inputSpy = await mockInput([
      "김성민,조혜원숭이콩떡,노정완",
      "3",
      "n",
    ]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 이름은 6글자 이하로 입력해야 합니다."
    );
    inputSpy.mockRestore();
  });
});
