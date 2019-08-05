let testSequence = "11001" + "1001001111001" + "1001001111"; //4729
let uniquePattern;

function getSequence(testPattern) {
  let bitCount = 2;

  console.log("looping");
  do {
    let start = testPattern.substr(0, bitCount);
    let next = testPattern.substr(bitCount, bitCount);
    bitCount++;
    if (start === next) {
      uniquePattern = start;
      break;
    } else {
      if (bitCount > testPattern.length / 2) {
        uniquePattern = "";
        break;
      }
    }
  } while (1);

  console.log("uniquePattern " + uniquePattern);
  if (uniquePattern.length > 0) {
    let shiftedSeq = uniquePattern;
    for (let i = 1; i < uniquePattern.length; i++) {
      shiftedSeq =
        shiftedSeq.substr(shiftedSeq.length - 1, 1) +
        shiftedSeq.substr(0, shiftedSeq.length - 1);
      if (
        parseInt(shiftedSeq, 2) <= parseInt(uniquePattern, 2) &&
        shiftedSeq.substr(0, 1) !== "0"
      ) {
        uniquePattern = shiftedSeq;
        //continue
      }
    }
  }

  console.log("uniquePattern " + uniquePattern);
}

getSequence(testSequence);
