function isSequenceUnique(sequence) {
  if (hasPeriodicPattern(sequence)) {
    return false;
  }
  if (hasCylicPermutation(sequence)) {
    return false;
  }
  return true;
}

function hasPeriodicPattern(sequence) {
  let sequenceLength = sequence.length;
  let periodicPattern = false;
  //   console.log("Sequence length " + sequenceLength);
  for (let i = 2; i < sequenceLength / 2; i++) {
    if (sequenceLength % i === 0) {
      //   console.log("checking for next i " + i);
      let firstPattern = sequence.substr(0, sequenceLength / i);
      let lastPattern = sequence.substr(
        sequenceLength - sequenceLength / i,
        sequenceLength / i
      );
      //   console.log("firstPattern " + firstPattern);
      //   console.log("lastPattern " + lastPattern);
      if (firstPattern === lastPattern) {
        periodicPattern = true;
        break;
      }
      for (let j = 0; j < i - 1; j++) {
        let nextPattern = sequence.substr(
          (sequenceLength / i) * (j + 1),
          sequenceLength / i
        );
        // console.log("firstPattern " + firstPattern);
        // console.log("nextPattern " + nextPattern);
        if (firstPattern === nextPattern) {
          periodicPattern = true;
          break;
        }
        firstPattern = nextPattern;
      }

      if (periodicPattern) {
        break;
      }
    }
  }
  return periodicPattern;
}

function hasCylicPermutation(sequence) {
  for (let i = 1; i < sequence.length; i++) {
    let shiftedSeq =
      sequence.substr(sequence.length - i, i) +
      sequence.substr(0, sequence.length - i);

    // console.log("shifted Sequence " + shiftedSeq);
    // console.log("orig Sequence " + sequence);
    if (
      parseInt(shiftedSeq, 2) <= parseInt(sequence, 2) &&
      shiftedSeq.substr(0, 1) !== "0"
    ) {
      return true;
    }
  }
  return false;
}

const findNextUniqueSequence = currentSequenceIndex => {
  currentSequenceIndex++;
  let sequence = currentSequenceIndex.toString(2);
  // console.log("Sequence " + sequence);
  //first check for periodic smaller pattern
  while (!isSequenceUnique(sequence)) {
    currentSequenceIndex++;
    sequence = currentSequenceIndex.toString(2);
    //    console.log("Sequence " + sequence);
  }
  // console.log("final Sequence " + sequence);
  return { currentSequenceIndex, currentSequence: sequence };
};

module.exports = findNextUniqueSequence;
