const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDimArray = lines.map((e) => e.split(""));
      const secondArray = createZeroArray(twoDimArray);

      const getNextPosition = ({ r, c }) => {
        if (r != 0 && ["|", "7", "F"].includes(twoDimArray[r - 1][c]))
          return { r: r - 1, c: c, v: twoDimArray[r - 1][c] };
        if (["|", "L", "J"].includes(twoDimArray[r + 1][c]))
          return { r: r + 1, c: c, v: twoDimArray[r + 1][c] };
        if (["-", "L", "F"].includes(twoDimArray[r][c - 1]))
          return { r: r, c: c - 1, v: twoDimArray[r][c - 1] };
        if (["-", "J", "7"].includes(twoDimArray[r][c + 1]))
          return { r: r, c: c + 1, v: twoDimArray[r][c + 1] };
      };

      let firstCounter = 0;

      let lastPosition = findValueInArray(twoDimArray, "S");
      secondArray[lastPosition.r][lastPosition.c] = lastPosition.v;
      let nextPosition = getNextPosition(lastPosition);
      secondArray[nextPosition.r][nextPosition.c] = nextPosition.v;
      firstCounter++;

      while (nextPosition.v !== "S") {
        if (nextPosition.v === "|" && lastPosition.r === nextPosition.r - 1) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r + 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r + 1][nextPosition.c],
          };
        } else if (
          nextPosition.v === "|" &&
          lastPosition.r === nextPosition.r + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r - 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r - 1][nextPosition.c],
          };
        } else if (
          nextPosition.v === "-" &&
          lastPosition.c === nextPosition.c - 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c + 1,
            v: twoDimArray[nextPosition.r][nextPosition.c + 1],
          };
        } else if (
          nextPosition.v === "-" &&
          lastPosition.c === nextPosition.c + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c - 1,
            v: twoDimArray[nextPosition.r][nextPosition.c - 1],
          };
        } else if (
          nextPosition.v === "L" &&
          lastPosition.r === nextPosition.r - 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c + 1,
            v: twoDimArray[nextPosition.r][nextPosition.c + 1],
          };
        } else if (
          nextPosition.v === "L" &&
          lastPosition.c === nextPosition.c + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r - 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r - 1][nextPosition.c],
          };
        } else if (
          nextPosition.v === "F" &&
          lastPosition.r === nextPosition.r + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c + 1,
            v: twoDimArray[nextPosition.r][nextPosition.c + 1],
          };
        } else if (
          nextPosition.v === "F" &&
          lastPosition.c === nextPosition.c + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r + 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r + 1][nextPosition.c],
          };
        } else if (
          nextPosition.v === "J" &&
          lastPosition.r === nextPosition.r - 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c - 1,
            v: twoDimArray[nextPosition.r][nextPosition.c - 1],
          };
        } else if (
          nextPosition.v === "J" &&
          lastPosition.c === nextPosition.c - 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r - 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r - 1][nextPosition.c],
          };
        } else if (
          nextPosition.v === "7" &&
          lastPosition.r === nextPosition.r + 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r,
            c: nextPosition.c - 1,
            v: twoDimArray[nextPosition.r][nextPosition.c - 1],
          };
        } else if (
          nextPosition.v === "7" &&
          lastPosition.c === nextPosition.c - 1
        ) {
          lastPosition = nextPosition;
          nextPosition = {
            r: nextPosition.r + 1,
            c: nextPosition.c,
            v: twoDimArray[nextPosition.r + 1][nextPosition.c],
          };
        }
        secondArray[nextPosition.r][nextPosition.c] = nextPosition.v;
        firstCounter++;
      }

      console.log("firstCounter: ", firstCounter / 2);
      console.log("secondCounter: ", countSecondSum(secondArray));
    }
  });
};

function findValueInArray(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === target) {
        return { r: i, c: j, v: target };
      }
    }
  }
  return null;
}

function createZeroArray(originalArray) {
  const newArray = [];

  for (let i = 0; i < originalArray.length; i++) {
    const row = [];

    for (let j = 0; j < originalArray[i].length; j++) {
      row.push("0");
    }

    newArray.push(row);
  }

  return newArray;
}

function countSecondSum(data) {
  let counter = 0;
  data.map((line) => {
    line.map((e, i) => {
      const numberOfProperSymbols = line
        .slice(i)
        .filter((e) => ["|", "J", "L"].includes(e)).length;
      if (
        e === "0" &&
        numberOfProperSymbols % 2 != 0 &&
        numberOfProperSymbols > 0
      ) {
        counter++;
      }
    });
  });

  return counter;
}

readFile();
