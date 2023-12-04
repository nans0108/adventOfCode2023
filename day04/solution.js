const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");

      let firstSum = 0;
      let winsByCard = [];

      lines.map((line) => {
        const pipeIndex = line.indexOf("|");

        const firstArrayStr = line.slice(line.indexOf(":") + 1, pipeIndex);
        const secondArrayStr = line.slice(pipeIndex + 1);

        const firstArray = firstArrayStr.split(" ").filter((e) => e !== "");
        const secondArray = secondArrayStr.split(" ").filter((e) => e !== "");
        // console.log(firstArray);
        // console.log(secondArray);

        let lineSum = 0;
        let numberOfWins = 0;

        firstArray.map((i) => {
          if (secondArray.includes(i)) {
            if (lineSum === 0) lineSum = 1;
            else lineSum = lineSum * 2;
            numberOfWins = numberOfWins + 1;
          }
        });
        winsByCard.push(numberOfWins);
        firstSum = firstSum + lineSum;
      });

      console.log("firstSum", firstSum);
      console.log("secondSum", getCountOfAllCards(winsByCard));
    }
  });
};

readFile();

const getCountOfAllCards = (data) => {
  let sum = data.length;
  let newData = data.map((liczba) => [liczba]);

  for (let i = 0; i < newData.length; i++) {
    newData[i].map((value) => {
      if (value > 0) {
        for (let j = i + 1; j <= i + value && j < newData.length; j++) {
          newData[j].push(newData[j][0]);
          sum++;
        }
      }
    });
  }

  return sum;
};
