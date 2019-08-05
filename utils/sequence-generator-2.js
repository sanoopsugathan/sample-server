const boundary = "1011";
const numBits = 16;

const findNextUniqueSequence = currentSequenceIndex => {
  let sequenceFound = false;
  currentSequenceIndex++;
  while (!sequenceFound) {
    var seq = currentSequenceIndex.toString(2);
    while (seq.length < numBits) {
      seq = "0" + seq;
    }
    let testSeq =
      boundary.substr(1, boundary.length - 1) +
      seq +
      boundary.substr(0, boundary.length - 1);

    if (testSeq.indexOf(boundary) === -1) {
      sequenceFound = true;
    } else {
      if (testSeq.indexOf(boundary) < testSeq.length - 7) {
        let power = testSeq.length - testSeq.indexOf(boundary) - 7;
        currentSequenceIndex = currentSequenceIndex + Math.pow(2, power);
      } else {
        currentSequenceIndex++;
      }
    }
  }
  return { currentSequenceIndex, currentSequence: boundary + seq };
};

module.exports = findNextUniqueSequence;
