const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDigitsArray = convertLinesToTwoDigit(lines);
      console.log(sum(twoDigitsArray));
    }
  });
};

const convertLinesToTwoDigit = (data) => {
  const newData = data.map((line) => {
    const firstInt = line.match(/\d/);
    const secondInt = line.split("").reverse().join("").match(/\d/);
    return `${firstInt}${secondInt}`;
  });
  return newData;
};

const sum = (data) => {
  return data.reduce((acc, num) => {
    return acc + parseInt(num, 10);
  }, 0);
};

readFile();
