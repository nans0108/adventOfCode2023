const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");

      const time = lines[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((e) => e !== "")
        .join("");
      const distance = lines[1]
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((e) => e !== "")
        .join("");

      let secondSum = 0;

      let numberOfBeatRecords = 0;
      for (let i = 0; i <= time; i++) {
        const newDistance = (time - i) * i;
        if (newDistance > distance) numberOfBeatRecords++;
      }

      secondSum =
        secondSum !== 0 ? secondSum * numberOfBeatRecords : numberOfBeatRecords;

      console.log("secondSum", secondSum);
    }
  });
};

readFile();
