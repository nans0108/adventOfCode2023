const FIVE = "FIVE";
const FOUR = "FOUR";
const FULL_HOUSE = "FULL_HOUSE";
const THREE = "THREE";
const TWO_PAIR = "TWO_PAIR";
const ONE_PAIR = "ONE_PAIR";
const HIGH_CARD = "HIGH_CARD";

const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      let instruction = [];
      let steps = [];
      lines.map((e, i) => {
        if (i === 0) instruction = e.split("");
        else if (i >= 2) {
          const splitted = e.split(" = ");
          steps.push({
            step: splitted[0],
            L: splitted[1].substring(1, splitted[1].indexOf(",")),
            R: splitted[1].substring(
              splitted[1].indexOf(",") + 2,
              splitted[1].length - 1
            ),
          });
        }
      });

      let firstCounter = 0;
      let lastStep = "AAA";
      while (lastStep !== "ZZZ") {
        instruction.map((side) => {
          if (lastStep !== "ZZZ") {
            lastStep = steps.filter((e) => e.step === lastStep)[0][side];
            firstCounter++;
          }
        });
      }

      console.log("firstCounter: ", firstCounter);

      let allPaths = steps
        .filter((e) => e.step.charAt(e.step.length - 1) === "A")
        .map((e) => e.step);
      let secondCounter = 0;

      while (
        allPaths.filter((e) => e.charAt(e.length - 1) === "Z").length !==
        allPaths.length
      ) {
        instruction.map((side) => {
          if (
            allPaths.filter((e) => e.charAt(e.length - 1) === "Z").length !==
            allPaths.length
          ) {
            let newArray = [];
            allPaths.map((step) => {
              newArray.push(steps.filter((e) => e.step === step)[0][side]);
            });
            console.log("newArray", newArray);
            allPaths = newArray;
            secondCounter++;
          }
        });
      }
      console.log("secondCounter: ", secondCounter);
    }
  });
};

readFile();
