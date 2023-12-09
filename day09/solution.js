const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");

      let firstCounter = 0;
      let secondCounter = 0;

      lines.map((line) => {
        let lastNumbers = [];
        let secondLastNumber = [];

        const rec = (data, moreToCheck) => {
          let newDifferences = [];
          if (data.filter((e) => e === 0).length === data.length) return;
          else {
            for (let i = 0; i < data.length - 1; i++) {
              const diff = data[i + 1] - data[i];
              newDifferences.push(diff);
              if (i === data.length - 2) moreToCheck.push(diff);
            }
            rec(newDifferences, moreToCheck);
          }
        };
        const newArray = line.split(" ").map(Number);

        lastNumbers.push(newArray[newArray.length - 1]);
        rec(newArray, lastNumbers);

        secondLastNumber.push(newArray[0]);
        rec(newArray.reverse(), secondLastNumber);

        lastNumbers.map((e) => (firstCounter = firstCounter + e));
        secondLastNumber.map((e) => (secondCounter = secondCounter + e));
      });

      console.log("firstCounter: ", firstCounter);
      console.log("secondCounter: ", secondCounter);
    }
  });
};

readFile();
