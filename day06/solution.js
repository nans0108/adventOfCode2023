const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");

      const times = lines[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .map(Number)
        .filter((e) => e !== 0);
      const distances = lines[1]
        .split(":")[1]
        .trim()
        .split(" ")
        .map(Number)
        .filter((e) => e !== 0);

      let firstSum = 0;
      times.map((time, index) => {
        let numberOfBeatRecords = 0;
        for (let i = 0; i <= time; i++) {
          const distance = (time - i) * i;
          if (distance > distances[index]) numberOfBeatRecords++;
        }

        firstSum =
          firstSum !== 0 ? firstSum * numberOfBeatRecords : numberOfBeatRecords;
      });

      console.log("firstSum", firstSum);
    }
  });
};

readFile();
