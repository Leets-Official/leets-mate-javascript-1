const readline = require("readline");

const MyUtils = {
  userInput: "",
  userInputArray: [],
  maxPairs: 0,

  setUserInput: (input) => {
    MyUtils.userInput = input;
  },
  setUserInputArray: (input) => {
    MyUtils.userInputArray = input;
  },

  setMaxPairs: (input) => {
    MyUtils.maxPairs = input;
  },

  Console: {
    print: (message) => {
      console.log(message);
    },

    readLineAsync: () => {
      return new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl.question("", (input) => {
          rl.close();
          resolve(input);
        });
      });
    },
  },
};

module.exports = MyUtils;
