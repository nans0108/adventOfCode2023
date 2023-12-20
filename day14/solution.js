const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDimArray = lines.map((e) => e.split(""));
      let firstCounter = 0;

      formNewArray(twoDimArray)
        .reverse()
        .map((line, index) => {
          firstCounter =
            firstCounter + line.filter((e) => e === "O").length * (index + 1);
        });
      console.log("firstCounter: ", firstCounter);
    }
  });
};

function formNewArray(data) {
  let newData = data;
  data.map((line, rowIndex) => {
    if (rowIndex > 0) {
      line.map((value, colIndex) => {
        if (value === "O") {
          let i = rowIndex - 1;
          {
            while (i >= 0 && newData[i][colIndex] === ".") {
              newData[i + 1][colIndex] = ".";
              newData[i][colIndex] = "O";
              i--;
            }
          }
        }
      });
    }
  });

  return newData;
}

readFile();
