const readline = require('readline');

const MyUtils = {
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

        rl.question('', (input) => {
          rl.close();
          resolve(input);
        });
      });
    },
  },
};

module.exports = MyUtils;
