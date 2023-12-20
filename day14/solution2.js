const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDimArray = lines.map((e) => e.split(""));
      let counter = 0;

      formNewArray(twoDimArray)
        .reverse()
        .map((line, index) => {
          counter =
            counter + line.filter((e) => e === "O").length * (index + 1);
        });
      console.log("counter: ", counter);
    }
  });
};

function runCycle(data) {
  // north
  let newData = data;
  data.map((line, rowIndex) => {
    line.map((value, colIndex) => {
      if (rowIndex > 0 && value === "O") {
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
  });
  console.log("after north newData", newData.toString());

  // west

  newData.map((line, rowIndex) => {
    line.map((value, colIndex) => {
      if (colIndex > 0 && value === "O") {
        let i = colIndex - 1;
        {
          while (i >= 0 && newData[rowIndex][i] === ".") {
            newData[rowIndex][i + 1] = ".";
            newData[rowIndex][i] = "O";
            i--;
          }
        }
      }
    });
  });

  console.log("after west newData", newData.toString());

  // south

  newData.map((line, rowIndex) => {
    line.map((value, colIndex) => {
      if (rowIndex < newData.length - 1 && value === "O") {
        let i = rowIndex + 1;
        {
          while (i <= newData.length - 1 && newData[i][colIndex] === ".") {
            newData[i - 1][colIndex] = ".";
            newData[i][colIndex] = "O";
            i++;
          }
        }
      }
    });
  });

  console.log("after south newData", newData.toString());

  // east

  newData.map((line, rowIndex) => {
    line.map((value, colIndex) => {
      if (colIndex < line.length - 1 && value === "O") {
        let i = colIndex + 1;
        {
          while (i <= line.length - 1 && newData[rowIndex][i] === ".") {
            newData[rowIndex][i - 1] = ".";
            newData[rowIndex][i] = "O";
            i++;
          }
        }
      }
    });
  });
  console.log("after east newData", newData.toString());
  return newData;
}

function formNewArray(data) {
  let seenGrids = [];
  let foundCycle = false;
  let index = 0;
  let cycle = 0;
  let newData = data;

  while (!foundCycle) {
    cycle++;
    newData = runCycle(newData);
    const gridStr = newData.toString();

    if (seenGrids.includes(gridStr)) {
      index = seenGrids.indexOf(gridStr);
      foundCycle = true;
    } else {
      seenGrids.push(gridStr);
    }
  }

  // const periodicStates = [];
  // do {
  //   periodicStates.push(newData.toString());
  //   newData = runCycle(newData);
  // } while (!periodicStates.includes(newData.toString()));

  const cyclesLeft = (1000000000 - cycle) % (cycle - index + 1);

  for (let i = 0; i < cyclesLeft; i++) {
    newData = runCycle(newData);
  }

  return newData;
}

readFile();
