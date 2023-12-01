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
  const substringMapping = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    eno: 1,
    owt: 2,
    eerht: 3,
    ruof: 4,
    evif: 5,
    xis: 6,
    neves: 7,
    thgie: 8,
    enin: 9,
  };

  const newData = data.map((line) => {
    const firstInt = line
      .replace(
        /(one|two|three|four|five|six|seven|eight|nine)/g,
        (match, p1) => {
          return substringMapping[p1] || match;
        }
      )
      .match(/\d/);

    const secondInt = line
      .split("")
      .reverse()
      .join("")
      .replace(
        /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g,
        (match, p1) => {
          return substringMapping[p1] || match;
        }
      )
      .match(/\d/);

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
