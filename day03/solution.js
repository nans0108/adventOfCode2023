const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const newData = checkIsNextToSymbol(createTwoDimensionArray(lines));
      console.log(sum(newData));
    }
  });
};

const createTwoDimensionArray = (lines) => {
  let twoDArray = [];

  for (let i = 0; i < lines.length; i++) {
    let row = lines[i].split("").map((value) => {
      return { value: value, isNextToSymbol: false };
    });
    twoDArray.push(row);
  }

  return twoDArray;
};

const checkIsNextToSymbol = (data) => {
  let specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g;

  const setIsNextToSymbol = (i, j) => (data[i][j].isNextToSymbol = true);

  const checkMatchSpecialChar = (i, j) =>
    data[i][j].value.match(specialCharRegex);

  for (let i = 0; i < data.length; i++) {
    data.map((line) => {
      for (let j = 0; j < line.length; j++) {
        if (data[i][j].value.match(/\d/)) {
          if (i > 0 && j > 0 && checkMatchSpecialChar(i - 1, j - 1))
            setIsNextToSymbol(i, j);
          if (i > 0 && checkMatchSpecialChar(i - 1, j)) setIsNextToSymbol(i, j);
          if (
            i > 0 &&
            j + 1 < line.length &&
            checkMatchSpecialChar(i - 1, j + 1)
          )
            setIsNextToSymbol(i, j);
          if (j > 0 && checkMatchSpecialChar(i, j - 1)) setIsNextToSymbol(i, j);
          if (j + 1 < line.length && checkMatchSpecialChar(i, j + 1))
            setIsNextToSymbol(i, j);
          if (
            j > 0 &&
            i + 1 < data.length &&
            checkMatchSpecialChar(i + 1, j - 1)
          )
            setIsNextToSymbol(i, j);
          if (i + 1 < data.length && checkMatchSpecialChar(i + 1, j))
            setIsNextToSymbol(i, j);
          if (
            i + 1 < data.length &&
            j + 1 < line.length &&
            checkMatchSpecialChar(i + 1, j + 1)
          )
            setIsNextToSymbol(i, j);
        }
      }
    });
  }

  return data;
};

const sum = (data) => {
  let sum = 0;
  data.map((line) => {
    let i = 0;
    while (i < line.length) {
      if (line[i].isNextToSymbol) {
        let text = "";
        let j = i;

        while (j >= 0 && line[j].value.match(/\d/)) {
          text = text + line[j].value;
          j--;
        }
        text = text.split("").reverse().join("");
        j = i + 1;
        while (j < line.length && line[j].value.match(/\d/)) {
          text = text + line[j].value;
          j++;
        }
        sum = sum + Number(text);
        i = j;
      } else i++;
    }
  });

  return sum;
};

readFile();
