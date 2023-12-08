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
      const cardsWithBid = lines.map((line) => {
        const temp = line.split(" ");
        const type = getType(temp[0]);

        return {
          cards: temp[0],
          bid: temp[1],
          type: type,
        };
      });
      let firstSum = 0;
      sortByType(cardsWithBid).map(
        (e, i) => (firstSum = firstSum + e.bid * (i + 1))
      );
      console.log("firstSum", firstSum);
    }
  });
};

const getType = (data) => {
  const cards = data.split("");

  const cardCount = {};
  cards.forEach((card) => {
    if (cardCount[card]) {
      cardCount[card]++;
    } else {
      cardCount[card] = 1;
    }
  });

  const values = Object.values(cardCount);

  if (values.includes(5)) {
    return FIVE;
  } else if (values.includes(4)) {
    return FOUR;
  } else if (values.includes(3) && values.includes(2)) {
    return FULL_HOUSE;
  } else if (values.includes(3) && values.includes(1)) {
    return THREE;
  } else if (values.filter((element) => element == 2).length === 2) {
    return TWO_PAIR;
  } else if (values.includes(2)) {
    return ONE_PAIR;
  } else {
    return HIGH_CARD;
  }
};

const CardRank = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const RankByType = {
  FIVE: 7,
  FOUR: 6,
  FULL_HOUSE: 5,
  THREE: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

const sortByType = (data) => {
  return data.sort((a, b) => {
    if (a.type === b.type) {
      const aArray = a.cards.split("");
      const bArray = b.cards.split("");
      let index = null;
      aArray.map((e, i) => {
        if (e !== bArray[i] && index === null) index = i;
      });

      return CardRank[aArray[index]] - CardRank[bArray[index]];
    } else {
      return RankByType[a.type] - RankByType[b.type];
    }
  });
};

readFile();
