export const MyUtils = {
  userInput: "",

  setUserInput: (input) => {
    MyUtils.userInput = input;
  },

  Console: {
    print: (message) => {
      console.log(message);
    },

    readLineAsync: () => {
      return new Promise((resolve) => {
        const readLine = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        readLine.question("", (input) => {
          readLine.close();
          resolve(input);
        });
      });
    },
  },
};

export default MyUtils;
