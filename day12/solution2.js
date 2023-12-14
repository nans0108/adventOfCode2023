const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      let firstCounter = 0;

      lines.map((line) => {
        const data = line.split(" ");
        firstCounter =
          firstCounter +
          getArrangementPossibilities(data[0], data[1].split(","));
      });

      console.log("firstCounter: ", firstCounter);
    }
  });
};

const getArrangementPossibilities = (_code, _arrangement) => {
  let code = `${_code}?${_code}?${_code}?${_code}?${_code}`;
  let arrangement = [
    ..._arrangement,
    ..._arrangement,
    ..._arrangement,
    ..._arrangement,
    ..._arrangement,
  ];

  const maxNumOfHashes = arrangement.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const numberOfHashesAlreadyUsed = (code.match(/#/g) || []).length;

  let counter = 0;
  const numberOfQuestion = (code.match(/\?/g) || []).length;
  const possibilities = Math.pow(2, numberOfQuestion);

  for (let i = 0; i < possibilities; i++) {
    let binary = i.toString(2).padStart(numberOfQuestion, "0");
    let positionCounter = 0;
    const combination = code.replace(/\?/g, () => {
      const replacement = binary.charAt(positionCounter) === "1" ? "#" : ".";
      positionCounter++;
      return replacement;
    });
    const arrayOfHash = combination.split(".").filter((e) => e !== "");

    let tempCounter = 0;
    for (let j = 0; j < arrayOfHash.length; j++) {
      if (arrayOfHash.length === arrangement.length) {
        if (arrayOfHash[j].length == arrangement[j]) {
          tempCounter++;
        }
      }
    }
    if (tempCounter === arrangement.length) counter++;
  }

  return counter;
};

readFile();
