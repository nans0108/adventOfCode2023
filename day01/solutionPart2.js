const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDigitsArray = convertLinesToTwoDigit(convertSubstrings(lines));
      console.log(sum(twoDigitsArray));
    }
  });
};

const convertSubstrings = (data) => {
  const possibleStrings = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  return data.map((line) => {
    let newLine = line;
    Object.keys(possibleStrings).map((key) => {
      newLine = newLine.replace(`${key}`, possibleStrings[key]);
    });
    return newLine;
  });
};

const convertLinesToTwoDigit = (data) => {
  const newData = data.map((line) => {
    const firstInt = line.match(/\d/);
    const secondInt = line.split("").reverse().join("").match(/\d/);
    return secondInt ? `${firstInt}${secondInt}` : `${firstInt}${firstInt}`;
  });
  return newData;
};

const sum = (data) => {
  return data.reduce((acc, num) => {
    return acc + parseInt(num, 10);
  }, 0);
};

readFile();
