// 12 red ,
// 13 green
// 14 blue

const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const lines = data.split("\n");
      const sumOfCubes = convertForSumOfCubesByColor(lines);
      console.log(getSumOfPower(sumOfCubes));
    }
  });
};

const convertForSumOfCubesByColor = (data) => {
  return data.map((line) => {
    const gameId = line.split(":")[0].split(" ")[1];
    const cubes = line.split(":")[1].split(/,|;/);

    const redCubes = cubes.filter((cube) => cube.includes("red"));
    const greenCubes = cubes.filter((cube) => cube.includes("green"));
    const blueCubes = cubes.filter((cube) => cube.includes("blue"));

    const redCubesCount = redCubes.map((cube) =>
      Number(cube.trim("").split(" ")[0])
    );
    const greenCubesCount = greenCubes.map((cube) =>
      Number(cube.trim("").split(" ")[0])
    );
    const blueCubesCount = blueCubes.map((cube) =>
      Number(cube.trim("").split(" ")[0])
    );

    const newElement = {
      id: gameId,
      red: redCubesCount,
      green: greenCubesCount,
      blue: blueCubesCount,
    };

    return newElement;
  });
};

const getSumOfPower = (data) => {
  let sumOfGoodGames = 0;

  data.map(({ red, green, blue }) => {
    const maxRedNumber = Math.max(...red);
    const maxGreenNumber = Math.max(...green);
    const maxBlueNumber = Math.max(...blue);

    sumOfGoodGames =
      sumOfGoodGames + maxRedNumber * maxGreenNumber * maxBlueNumber;
  });

  return sumOfGoodGames;
};

readFile();
