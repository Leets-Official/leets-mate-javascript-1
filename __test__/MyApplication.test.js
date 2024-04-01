import App from "../src/App";

describe("오늘의 짝꿍은?", () => {
  test("정상적인 입력일 때 올바른 결과가 출력되는지 확인", async () => {
    const app = new App();
    const result1 = await app.play(
      ["김성민", "조혜원", "노정완", "김혜진", "양태석"],
      3
    );
    const result2 = await app.play(
      ["김성민", "조혜원", "노정완", "김혜진", "양태석"],
      3
    );

    // 두 결과가 다르다면 테스트 통과
    expect(result1).not.toEqual(result2);
  });

  test("이름이 한글이 아닌 경우 에러가 발생하는지 확인", async () => {
    const app = new App();
    await expect(app.play(["John", "Doe"], 2)).rejects.toThrow(
      "[ERROR] 이름은 한글로 입력해야 합니다"
    );
  });

  test("최대 짝 수가 이름의 갯수보다 클 때 에러가 발생하는지 확인", async () => {
    const app = new App();
    await expect(
      app.play(["김성민", "조혜원", "노정완", "김혜진", "양태석"], 6)
    ).rejects.toThrow("[ERROR] 최대 짝 수는 이름의 갯수보다 클 수 없습니다");
  });

  test("한 명의 이름이 입력되었을 때도 정상적으로 짝을 구성하는지 확인", async () => {
    const app = new App();
    const result = await app.play(["김성민"], 1);

    // 한 명일 때는 자기 자신과의 짝만 있어야 함
    expect(result).toEqual([[["김성민"]]]);
  });

  test("입력된 이름이 정확히 들어갔는지 확인", async () => {
    const app = new App();
    const result = await app.play(["김성민", "조혜원", "노정완"], 3);

    // 입력된 이름이 모두 포함되어야 함
    expect(result.flat().flat().sort()).toEqual(["김성민", "노정완", "조혜원"]);
  });

  test("결과 값이 최대 짝 수를 넘지 않는지 확인", async () => {
    const app = new App();
    const result = await app.play(["김성민", "조혜원", "노정완"], 2);

    // 최대 짝 수를 넘지 않아야 함
    expect(result.flat().every((group) => group.length <= 2)).toBe(true);
  });
});
