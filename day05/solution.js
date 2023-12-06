const readFile = () => {
  const fs = require("fs");

  const fileName = "input.txt";

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}: ${err.message}`);
    } else {
      const [
        seeds,
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation,
      ] = data.split("\n\n");

      function parseSection(section) {
        return section
          .trim()
          .split("\n")
          .slice(1)
          .map((line) => line.split(" ").map(Number));
      }
      const seedsArray = seeds.split(":")[1].trim().split(" ").map(Number);
      const seedToSoilArray = parseSection(seedToSoil);
      const soilToFertilizerArray = parseSection(soilToFertilizer);
      const fertilizerToWaterArray = parseSection(fertilizerToWater);
      const waterToLightArray = parseSection(waterToLight);
      const lightToTemperatureArray = parseSection(lightToTemperature);
      const temperatureToHumidityArray = parseSection(temperatureToHumidity);
      const humidityToLocationArray = parseSection(humidityToLocation);

      const getSinglePosition = (position) => {
        const soilPosition = getPosition(position, seedToSoilArray);
        const fertilizerPosition = getPosition(
          soilPosition,
          soilToFertilizerArray
        );
        const waterPosition = getPosition(
          fertilizerPosition,
          fertilizerToWaterArray
        );
        const lightPosition = getPosition(waterPosition, waterToLightArray);
        const temperaturePosition = getPosition(
          lightPosition,
          lightToTemperatureArray
        );
        const humidityPosition = getPosition(
          temperaturePosition,
          temperatureToHumidityArray
        );
        const locationPosition = getPosition(
          humidityPosition,
          humidityToLocationArray
        );
        return locationPosition;
      };

      const getSeedsPositions = (allSeeds) => {
        let seedsPositions = [];
        allSeeds.map((position) => {
          seedsPositions.push(getSinglePosition(position));
        });

        return seedsPositions;
      };

      let secondSeedsMin = 0;
      seedsArray.map((seed, index) => {
        if (index % 2 !== 0) {
          let i = 0;
          while (i < seed) {
            const newPosition = getSinglePosition(seedsArray[index - 1] + i);
            if (newPosition < secondSeedsMin || secondSeedsMin === 0)
              secondSeedsMin = newPosition;
            i++;
          }
        }
      });

      console.log(
        "first lowest position",
        Math.min(...getSeedsPositions(seedsArray))
      );
      console.log("second lowest position", secondSeedsMin);
    }
  });
};

const getPosition = (position, dataToGetPosition) => {
  let newPosition = position;
  dataToGetPosition.map((line) => {
    if (position >= line[1] && position <= line[1] + line[2] - 1)
      newPosition = line[0] + position - line[1];
  });
  return newPosition;
};

readFile();
