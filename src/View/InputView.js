const { Console } = require('../../Utils/MyUtils.js');
const OutputView = require('../View/OutputView.js');

class InputView {
  static async read(question, validate) {
    OutputView.print(question);

    const answer = await Console.readLineAsync();
    validate(answer);

    return answer;
  }
}

module.exports = InputView;
