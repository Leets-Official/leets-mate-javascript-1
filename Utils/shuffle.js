// 피셔-예이츠 셔플(Fisher-Yates shuffle)
function shuffle(array) {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

module.exports = shuffle;
