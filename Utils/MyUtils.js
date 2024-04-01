export const Console = {
  print: (message) => {
    console.log(message);
  },

  readLineAsync: () => {
    return new Promise((resolve, reject) => {
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
};
