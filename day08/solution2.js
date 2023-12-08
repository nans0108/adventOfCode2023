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

      let allPaths = steps
        .filter((e) => e.step.charAt(e.step.length - 1) === "A")
        .map((e) => e.step);

      let temp = [];
      allPaths.map((e) => {
        let secondCounter = 0;
        lastStep = e;
        while (lastStep.charAt(e.length - 1) !== "Z") {
          instruction.map((side) => {
            if (lastStep.charAt(e.length - 1) !== "Z") {
              lastStep = steps.filter((e) => e.step === lastStep)[0][side];
              secondCounter++;
            }
          });
        }
        temp.push(secondCounter);
      });

      console.log("secondCounter: ", calculateMultipleLCM(temp));
    }
  });
};

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

function lcm(a, b) {
  return (Math.abs(a) * Math.abs(b)) / gcd(a, b);
}

function calculateMultipleLCM(numbers) {
  if (numbers.length < 2) {
    throw new Error("Podaj przynajmniej dwie liczby.");
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}

readFile();
