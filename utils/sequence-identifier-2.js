let testSequence = "1011" + "0000000000100100";
let uniquePattern;
let boundarySeq = "1011";
let numBits = 16;
function getSequence(testPattern) {
  let boundary = testPattern.indexOf(boundarySeq);
  if (boundary >= 0) {
    if (testPattern.length >= boundary + 4 + numBits) {
      uniquePattern = testPattern.substr(boundary + 4, numBits);
    } else {
      if (testPattern.length >= numBits + 4) {
        uniquePattern = testPattern.substr(boundary + 4);
        uniquePattern =
          uniquePattern +
          testPattern.substr(
            boundary - numBits + uniquePattern.length,
            numBits - uniquePattern.length
          );
      }
    }
  }

  console.log("uniquePattern " + uniquePattern);
}

getSequence(testSequence);
