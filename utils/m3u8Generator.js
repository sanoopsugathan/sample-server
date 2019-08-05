const m3u8reader = require("m3u8-reader");
const m3u8write = require("m3u8-write");
const fs = require("fs");
const path = require("path");

const generateM3U8 = (acopy, bcopy, assetId, sequence) => {
  let fileContentA = fs.readFileSync(acopy);
  let fileContentB = fs.readFileSync(bcopy);

  let parsedManifestA = m3u8reader(fileContentA);
  let parsedManifestB = m3u8reader(fileContentB);
  let mixedPlaylist = [];
  let seqIdx = 0;

  if (parsedManifestA.length === parsedManifestB.length) {
    for (let i = 0; i < parsedManifestA.length; i++) {
      if (typeof parsedManifestA[i] === "string") {
        let filename = path.basename(parsedManifestA[i]);
        let extension = path.extname(filename);
        if (extension === ".ts") {
          if (sequence[seqIdx] === "1") {
            mixedPlaylist[i] = parsedManifestB[i];
          } else {
            mixedPlaylist[i] = parsedManifestA[i];
          }
          seqIdx++;
          if (seqIdx >= sequence.length) {
            seqIdx = 0;
          }
        }
      } else {
        mixedPlaylist[i] = parsedManifestA[i];
      }
    }
  }

  if (mixedPlaylist.length > 0) {
    fs.writeFileSync(
      "./video_hls/" + assetId + sequence + ".m3u8",
      m3u8write(mixedPlaylist)
    );
  }

  return assetId + sequence + ".m3u8";
};

module.exports = generateM3U8;
