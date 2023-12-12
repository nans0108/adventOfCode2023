const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const twoDimArray = lines.map((e) => e.split(""));
      const array = addRowsAndColumns(twoDimArray, 1, 1);
      const galaxiesPositions = getGalaxiesPositions(array);
      let firstCounter = getPaths(galaxiesPositions, 1, array).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      console.log("firstCounter: ", firstCounter);

      const secondArray = addRowsAndColumns(twoDimArray, 1000000, 1000000);
      const secondGalaxiesPositions = getGalaxiesPositions(secondArray);
      let secondCounter = getPaths(
        secondGalaxiesPositions,
        1000000,
        secondArray
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      console.log("secondCounter: ", secondCounter);
    }
  });
};

function countOccurrences(matrix, startRow, endRow, startCol, endCol, target) {
  const submatrix = matrix
    .slice(startRow, endRow + 1)
    .map((row) => row.slice(startCol, endCol + 1));
  const rows = submatrix.length;
  const cols = submatrix[0].length;
  let counter = 0;

  for (let i = 0; i < rows; i++) {
    if (submatrix[i].every((element) => element === target)) counter++;
  }

  for (let j = 0; j < cols; j++) {
    if (submatrix.every((row) => row[j] === target)) counter++;
  }

  return target > 1 ? counter * target - counter : counter * target;
}

function getPaths(positions, numberToLookFor, array) {
  let pathLenghts = [];
  positions.map((first, index) => {
    positions.slice(index + 1).map((second) => {
      const rowDiff = Math.abs(first[0] - second[0]);
      const colDiff = Math.abs(first[1] - second[1]);
      const occurrences = countOccurrences(
        array,
        first[0] > second[0] ? second[0] : first[0],
        first[0] > second[0] ? first[0] : second[0],
        first[1] > second[1] ? second[1] : first[1],
        first[1] > second[1] ? first[1] : second[1],
        numberToLookFor
      );

      pathLenghts.push(rowDiff + colDiff + occurrences);
    });
  });
  return pathLenghts;
}

function getGalaxiesPositions(array) {
  let galaxiesPositions = [];

  array.map((line, row) => {
    line.map((e, column) => {
      if (e === "#") galaxiesPositions.push([row, column]);
    });
  });

  return galaxiesPositions;
}

function addRowsAndColumns(array, numberOfCol, numberOfRow) {
  const rows = array.length;
  const cols = array[0].length;
  const newArray = [];

  for (let i = 0; i < rows; i++) {
    if (array[i].every((element) => element === ".")) {
      newArray.push(Array(cols).fill(numberOfRow));
    } else newArray.push([...array[i]]);
  }
  for (let j = 0; j < cols; j++) {
    if (array.every((row) => row[j] === "." || row[j] === numberOfRow)) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i][j] = numberOfCol;
      }
    }
  }

  return newArray;
}

readFile();
